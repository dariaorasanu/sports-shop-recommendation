-- 04_triggers.sql
-- Triggere pentru proiectul Sports Shop Recommendation


DROP TRIGGER IF EXISTS trg_seteaza_data_inregistrare ON utilizatori;
DROP TRIGGER IF EXISTS trg_recalculeaza_total_comanda_insert_update ON detalii_comanda;
DROP TRIGGER IF EXISTS trg_recalculeaza_total_comanda_delete ON detalii_comanda;

DROP FUNCTION IF EXISTS seteaza_data_inregistrare();
DROP FUNCTION IF EXISTS recalculeaza_total_comanda();


-- 1. Trigger pentru setarea automata a datei de inregistrare

CREATE OR REPLACE FUNCTION seteaza_data_inregistrare()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.data_inregistrare IS NULL THEN
        NEW.data_inregistrare := CURRENT_TIMESTAMP;
END IF;

RETURN NEW;
END;
$$;

CREATE TRIGGER trg_seteaza_data_inregistrare
    BEFORE INSERT ON utilizatori
    FOR EACH ROW
    EXECUTE FUNCTION seteaza_data_inregistrare();


-- 2. Trigger pentru recalcularea automata a totalului unei comenzi

CREATE OR REPLACE FUNCTION recalculeaza_total_comanda()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
v_id_comanda INTEGER;
BEGIN
    IF TG_OP = 'DELETE' THEN
        v_id_comanda := OLD.id_comanda;
ELSE
        v_id_comanda := NEW.id_comanda;
END IF;

UPDATE comenzi
SET total = COALESCE((
                         SELECT SUM(cantitate * pret_unitar)
                         FROM detalii_comanda
                         WHERE id_comanda = v_id_comanda
                     ), 0)
WHERE id_comanda = v_id_comanda;

IF TG_OP = 'DELETE' THEN
        RETURN OLD;
ELSE
        RETURN NEW;
END IF;
END;
$$;

CREATE TRIGGER trg_recalculeaza_total_comanda_insert_update
    AFTER INSERT OR UPDATE ON detalii_comanda
                        FOR EACH ROW
                        EXECUTE FUNCTION recalculeaza_total_comanda();

CREATE TRIGGER trg_recalculeaza_total_comanda_delete
    AFTER DELETE ON detalii_comanda
    FOR EACH ROW
    EXECUTE FUNCTION recalculeaza_total_comanda();