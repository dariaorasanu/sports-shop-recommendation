-- 03_functions_procedures.sql


DROP PROCEDURE IF EXISTS plaseaza_comanda(INTEGER, INTEGER, INTEGER, VARCHAR);
DROP PROCEDURE IF EXISTS genereaza_recomandari(INTEGER);
DROP FUNCTION IF EXISTS calculeaza_scor_sport(INTEGER, INTEGER);
DROP FUNCTION IF EXISTS calculeaza_nivel_utilizator(INTEGER);


-- 1. Functie care calculeaza nivelul utilizatorului pe baza chestionarului

CREATE OR REPLACE FUNCTION calculeaza_nivel_utilizator(p_id_chestionar INTEGER)
RETURNS VARCHAR(20)
LANGUAGE plpgsql
AS $$
DECLARE
    v_nivel_activitate VARCHAR(20);
    v_toleranta_efort INTEGER;
    v_timp_liber INTEGER;
    v_nivel VARCHAR(20);
BEGIN
    SELECT nivel_activitate, toleranta_efort, timp_liber_ore
    INTO v_nivel_activitate, v_toleranta_efort, v_timp_liber
    FROM chestionare
    WHERE id_chestionar = p_id_chestionar;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Chestionarul cu id % nu exista', p_id_chestionar;
    END IF;

    IF v_nivel_activitate = 'SEDENTAR' OR v_toleranta_efort <= 2 THEN
        v_nivel := 'INCEPATOR';
    ELSIF v_nivel_activitate = 'ACTIV' AND v_toleranta_efort >= 4 AND v_timp_liber >= 6 THEN
        v_nivel := 'AVANSAT';
    ELSE
        v_nivel := 'MEDIU';
    END IF;

    RETURN v_nivel;
END;
$$;


-- 2. Functie care calculeaza scorul de compatibilitate dintre un chestionar si un sport

CREATE OR REPLACE FUNCTION calculeaza_scor_sport(
    p_id_chestionar INTEGER,
    p_id_sport INTEGER
)
RETURNS NUMERIC(5,2)
LANGUAGE plpgsql
AS $$
DECLARE
    v_preferinta_mediu VARCHAR(20);
    v_preferinta_tip VARCHAR(20);
    v_obiectiv VARCHAR(30);
    v_toleranta_efort INTEGER;
    v_timp_liber INTEGER;

    v_mediu_sport VARCHAR(20);
    v_tip_sport VARCHAR(20);
    v_obiectiv_sport VARCHAR(30);
    v_nivel_efort INTEGER;

    v_scor NUMERIC(5,2) := 0;
BEGIN
    SELECT preferinta_mediu,
           preferinta_tip_activitate,
           obiectiv,
           toleranta_efort,
           timp_liber_ore
    INTO v_preferinta_mediu,
         v_preferinta_tip,
         v_obiectiv,
         v_toleranta_efort,
         v_timp_liber
    FROM chestionare
    WHERE id_chestionar = p_id_chestionar;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Chestionarul cu id % nu exista', p_id_chestionar;
    END IF;

    SELECT mediu,
           tip_activitate,
           obiectiv_principal,
           nivel_efort
    INTO v_mediu_sport,
         v_tip_sport,
         v_obiectiv_sport,
         v_nivel_efort
    FROM sporturi
    WHERE id_sport = p_id_sport;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Sportul cu id % nu exista', p_id_sport;
    END IF;

    -- Potrivire mediu: maxim 25 puncte
    IF v_preferinta_mediu = v_mediu_sport
       OR v_preferinta_mediu = 'AMBELE'
       OR v_mediu_sport = 'AMBELE' THEN
        v_scor := v_scor + 25;
    END IF;

    -- Potrivire tip activitate: maxim 25 puncte
    IF v_preferinta_tip = v_tip_sport
       OR v_preferinta_tip = 'AMBELE'
       OR v_tip_sport = 'AMBELE' THEN
        v_scor := v_scor + 25;
    END IF;

    -- Potrivire obiectiv: maxim 20 puncte
    IF v_obiectiv = v_obiectiv_sport THEN
        v_scor := v_scor + 20;
    END IF;

    -- Potrivire efort: maxim 20 puncte
    IF ABS(v_toleranta_efort - v_nivel_efort) = 0 THEN
        v_scor := v_scor + 20;
    ELSIF ABS(v_toleranta_efort - v_nivel_efort) = 1 THEN
        v_scor := v_scor + 15;
    ELSIF ABS(v_toleranta_efort - v_nivel_efort) = 2 THEN
        v_scor := v_scor + 8;
    END IF;

    -- Timp disponibil: maxim 10 puncte
    IF v_timp_liber >= 5 THEN
        v_scor := v_scor + 10;
    ELSIF v_timp_liber >= 3 THEN
        v_scor := v_scor + 6;
    ELSE
        v_scor := v_scor + 3;
    END IF;

    RETURN v_scor;
END;
$$;


-- 3. Procedura care genereaza recomandari pentru un chestionar

CREATE OR REPLACE PROCEDURE genereaza_recomandari(p_id_chestionar INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    v_sport RECORD;
    v_scor NUMERIC(5,2);
    v_nivel VARCHAR(20);
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM chestionare
        WHERE id_chestionar = p_id_chestionar
    ) THEN
        RAISE EXCEPTION 'Chestionarul cu id % nu exista', p_id_chestionar;
    END IF;

    v_nivel := calculeaza_nivel_utilizator(p_id_chestionar);

    -- Actualizez nivelul in chestionar
    UPDATE chestionare
    SET nivel_utilizator = v_nivel
    WHERE id_chestionar = p_id_chestionar;

    DELETE FROM recomandari
    WHERE id_chestionar = p_id_chestionar;

    -- Parcurgem toate sporturile si calculam scorul
    FOR v_sport IN
        SELECT id_sport
        FROM sporturi
    LOOP
        v_scor := calculeaza_scor_sport(p_id_chestionar, v_sport.id_sport);

        IF v_scor >= 60 THEN
            INSERT INTO recomandari (
                id_chestionar,
                id_sport,
                scor_compatibilitate,
                nivel_recomandat
            )
            VALUES (
                p_id_chestionar,
                v_sport.id_sport,
                v_scor,
                v_nivel
            );
        END IF;
    END LOOP;
END;
$$;


-- 4. Procedura care plaseaza o comanda pentru un produs

CREATE OR REPLACE PROCEDURE plaseaza_comanda(
    p_id_utilizator INTEGER,
    p_id_produs INTEGER,
    p_cantitate INTEGER,
    p_adresa_livrare VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_stoc INTEGER;
    v_pret NUMERIC(8,2);
    v_id_comanda INTEGER;
BEGIN
    IF p_cantitate <= 0 THEN
        RAISE EXCEPTION 'Cantitatea trebuie sa fie mai mare decat 0';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM utilizatori
        WHERE id_utilizator = p_id_utilizator
    ) THEN
        RAISE EXCEPTION 'Utilizatorul cu id % nu exista', p_id_utilizator;
    END IF;

    -- Luam pretul si stocul produsului
    SELECT stoc, pret
    INTO v_stoc, v_pret
    FROM produse
    WHERE id_produs = p_id_produs;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Produsul cu id % nu exista', p_id_produs;
    END IF;

    IF v_stoc < p_cantitate THEN
        RAISE EXCEPTION 'Stoc insuficient pentru produsul cu id %. Stoc disponibil: %, cantitate ceruta: %',
            p_id_produs, v_stoc, p_cantitate;
    END IF;

    -- Cream comanda
    INSERT INTO comenzi (
        id_utilizator,
        status,
        total,
        adresa_livrare
    )
    VALUES (
        p_id_utilizator,
        'NOUA',
        v_pret * p_cantitate,
        p_adresa_livrare
    )
    RETURNING id_comanda INTO v_id_comanda;

    -- Adaugam produsul in detaliile comenzii
    INSERT INTO detalii_comanda (
        id_comanda,
        id_produs,
        cantitate,
        pret_unitar
    )
    VALUES (
        v_id_comanda,
        p_id_produs,
        p_cantitate,
        v_pret
    );


    UPDATE produse
    SET stoc = stoc - p_cantitate
    WHERE id_produs = p_id_produs;
END;
$$;