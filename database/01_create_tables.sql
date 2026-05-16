DROP TABLE IF EXISTS detalii_comanda CASCADE;
DROP TABLE IF EXISTS comenzi CASCADE;
DROP TABLE IF EXISTS produse CASCADE;
DROP TABLE IF EXISTS categorii_produse CASCADE;
DROP TABLE IF EXISTS recomandari CASCADE;
DROP TABLE IF EXISTS chestionare CASCADE;
DROP TABLE IF EXISTS sporturi CASCADE;
DROP TABLE IF EXISTS utilizatori CASCADE;

CREATE TABLE utilizatori (
                             id_utilizator SERIAL PRIMARY KEY,
                             nume VARCHAR(50) NOT NULL,
                             prenume VARCHAR(50) NOT NULL,
                             data_nastere DATE NOT NULL,
                             email VARCHAR(100) NOT NULL UNIQUE,
                             telefon VARCHAR(20),
                             parola VARCHAR(100) NOT NULL,
                             data_inregistrare TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sporturi (
                          id_sport SERIAL PRIMARY KEY,
                          denumire VARCHAR(50) NOT NULL UNIQUE,
                          mediu VARCHAR(20) NOT NULL,
                          nivel_efort INTEGER NOT NULL,
                          tip_activitate VARCHAR(20) NOT NULL,
                          obiectiv_principal VARCHAR(30) NOT NULL,
                          descriere VARCHAR(300),

                          CONSTRAINT chk_sporturi_mediu
                              CHECK (mediu IN ('INTERIOR', 'EXTERIOR', 'AMBELE')),

                          CONSTRAINT chk_sporturi_nivel_efort
                              CHECK (nivel_efort BETWEEN 1 AND 5),

                          CONSTRAINT chk_sporturi_tip_activitate
                              CHECK (tip_activitate IN ('INDIVIDUAL', 'ECHIPA', 'AMBELE')),

                          CONSTRAINT chk_sporturi_obiectiv
                              CHECK (obiectiv_principal IN ('SLABIRE', 'TONIFIERE', 'REZISTENTA', 'RELAXARE', 'COMPETITIE', 'SOCIALIZARE'))
);

CREATE TABLE categorii_produse (
                                   id_categorie SERIAL PRIMARY KEY,
                                   denumire VARCHAR(50) NOT NULL UNIQUE,
                                   descriere VARCHAR(200)
);

CREATE TABLE chestionare (
                             id_chestionar SERIAL PRIMARY KEY,
                             id_utilizator INTEGER NOT NULL,
                             data_completare TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             timp_liber_ore INTEGER NOT NULL,
                             nivel_activitate VARCHAR(20) NOT NULL,
                             obiectiv VARCHAR(30) NOT NULL,
                             restrictii_medicale VARCHAR(200),
                             buget_estimat NUMERIC(8,2) NOT NULL,
                             preferinta_tip_activitate VARCHAR(20) NOT NULL,
                             preferinta_mediu VARCHAR(20) NOT NULL,
                             toleranta_efort INTEGER NOT NULL,
                             nivel_utilizator VARCHAR(20),

                             CONSTRAINT fk_chestionare_utilizatori
                                 FOREIGN KEY (id_utilizator)
                                     REFERENCES utilizatori(id_utilizator)
                                     ON DELETE CASCADE,

                             CONSTRAINT chk_chestionare_timp_liber
                                 CHECK (timp_liber_ore >= 0),

                             CONSTRAINT chk_chestionare_buget
                                 CHECK (buget_estimat >= 0),

                             CONSTRAINT chk_chestionare_nivel_activitate
                                 CHECK (nivel_activitate IN ('SEDENTAR', 'MODERAT', 'ACTIV')),

                             CONSTRAINT chk_chestionare_obiectiv
                                 CHECK (obiectiv IN ('SLABIRE', 'TONIFIERE', 'REZISTENTA', 'RELAXARE', 'COMPETITIE', 'SOCIALIZARE')),

                             CONSTRAINT chk_chestionare_preferinta_tip
                                 CHECK (preferinta_tip_activitate IN ('INDIVIDUAL', 'ECHIPA', 'AMBELE')),

                             CONSTRAINT chk_chestionare_preferinta_mediu
                                 CHECK (preferinta_mediu IN ('INTERIOR', 'EXTERIOR', 'AMBELE')),

                             CONSTRAINT chk_chestionare_toleranta
                                 CHECK (toleranta_efort BETWEEN 1 AND 5),

                             CONSTRAINT chk_chestionare_nivel_utilizator
                                 CHECK (nivel_utilizator IS NULL OR nivel_utilizator IN ('INCEPATOR', 'MEDIU', 'AVANSAT'))
);

CREATE TABLE recomandari (
                             id_recomandare SERIAL PRIMARY KEY,
                             id_chestionar INTEGER NOT NULL,
                             id_sport INTEGER NOT NULL,
                             data_recomandare TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             scor_compatibilitate NUMERIC(5,2) NOT NULL,
                             nivel_recomandat VARCHAR(20) NOT NULL,

                             CONSTRAINT fk_recomandari_chestionare
                                 FOREIGN KEY (id_chestionar)
                                     REFERENCES chestionare(id_chestionar)
                                     ON DELETE CASCADE,

                             CONSTRAINT fk_recomandari_sporturi
                                 FOREIGN KEY (id_sport)
                                     REFERENCES sporturi(id_sport)
                                     ON DELETE CASCADE,

                             CONSTRAINT chk_recomandari_scor
                                 CHECK (scor_compatibilitate BETWEEN 0 AND 100),

                             CONSTRAINT chk_recomandari_nivel
                                 CHECK (nivel_recomandat IN ('INCEPATOR', 'MEDIU', 'AVANSAT')),

                             CONSTRAINT uk_recomandari_chestionar_sport
                                 UNIQUE (id_chestionar, id_sport)
);

CREATE TABLE produse (
                         id_produs SERIAL PRIMARY KEY,
                         id_categorie INTEGER NOT NULL,
                         id_sport INTEGER NOT NULL,
                         denumire VARCHAR(100) NOT NULL,
                         pret NUMERIC(8,2) NOT NULL,
                         stoc INTEGER NOT NULL,
                         nivel_recomandat VARCHAR(20) NOT NULL,

                         CONSTRAINT fk_produse_categorii
                             FOREIGN KEY (id_categorie)
                                 REFERENCES categorii_produse(id_categorie)
                                 ON DELETE RESTRICT,

                         CONSTRAINT fk_produse_sporturi
                             FOREIGN KEY (id_sport)
                                 REFERENCES sporturi(id_sport)
                                 ON DELETE CASCADE,

                         CONSTRAINT chk_produse_pret
                             CHECK (pret > 0),

                         CONSTRAINT chk_produse_stoc
                             CHECK (stoc >= 0),

                         CONSTRAINT chk_produse_nivel
                             CHECK (nivel_recomandat IN ('INCEPATOR', 'MEDIU', 'AVANSAT'))
);

CREATE TABLE comenzi (
                         id_comanda SERIAL PRIMARY KEY,
                         id_utilizator INTEGER NOT NULL,
                         data_comanda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         status VARCHAR(20) NOT NULL DEFAULT 'NOUA',
                         total NUMERIC(10,2) NOT NULL DEFAULT 0,
                         adresa_livrare VARCHAR(200) NOT NULL,

                         CONSTRAINT fk_comenzi_utilizatori
                             FOREIGN KEY (id_utilizator)
                                 REFERENCES utilizatori(id_utilizator)
                                 ON DELETE CASCADE,

                         CONSTRAINT chk_comenzi_status
                             CHECK (status IN ('NOUA', 'CONFIRMATA', 'ANULATA', 'FINALIZATA')),

                         CONSTRAINT chk_comenzi_total
                             CHECK (total >= 0)
);

CREATE TABLE detalii_comanda (
                                 id_detaliu SERIAL PRIMARY KEY,
                                 id_comanda INTEGER NOT NULL,
                                 id_produs INTEGER NOT NULL,
                                 cantitate INTEGER NOT NULL,
                                 pret_unitar NUMERIC(8,2) NOT NULL,

                                 CONSTRAINT fk_detalii_comanda_comenzi
                                     FOREIGN KEY (id_comanda)
                                         REFERENCES comenzi(id_comanda)
                                         ON DELETE CASCADE,

                                 CONSTRAINT fk_detalii_comanda_produse
                                     FOREIGN KEY (id_produs)
                                         REFERENCES produse(id_produs)
                                         ON DELETE RESTRICT,

                                 CONSTRAINT chk_detalii_cantitate
                                     CHECK (cantitate > 0),

                                 CONSTRAINT chk_detalii_pret
                                     CHECK (pret_unitar > 0)
);