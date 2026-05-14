-- 05_views.sql

DROP VIEW IF EXISTS view_comenzi_utilizatori;
DROP VIEW IF EXISTS view_produse_disponibile;
DROP VIEW IF EXISTS view_recomandari_utilizatori;


-- 1. View cu recomandarile generate pentru utilizatori

CREATE OR REPLACE VIEW view_recomandari_utilizatori AS
SELECT
    r.id_recomandare,
    u.id_utilizator,
    u.nume,
    u.prenume,
    u.email,
    c.id_chestionar,
    c.obiectiv,
    c.nivel_utilizator,
    s.id_sport,
    s.denumire AS sport_recomandat,
    s.mediu,
    s.tip_activitate,
    s.nivel_efort,
    r.scor_compatibilitate,
    r.nivel_recomandat,
    r.data_recomandare
FROM recomandari r
         JOIN chestionare c ON r.id_chestionar = c.id_chestionar
         JOIN utilizatori u ON c.id_utilizator = u.id_utilizator
         JOIN sporturi s ON r.id_sport = s.id_sport;


-- 2. View cu produsele disponibile, impreuna cu sportul si categoria lor

CREATE OR REPLACE VIEW view_produse_disponibile AS
SELECT
    p.id_produs,
    p.denumire AS produs,
    p.pret,
    p.stoc,
    p.nivel_recomandat,
    c.id_categorie,
    c.denumire AS categorie,
    s.id_sport,
    s.denumire AS sport,
    s.mediu,
    s.tip_activitate
FROM produse p
         JOIN categorii_produse c ON p.id_categorie = c.id_categorie
         JOIN sporturi s ON p.id_sport = s.id_sport
WHERE p.stoc > 0;


-- 3. View cu comenzile utilizatorilor

CREATE OR REPLACE VIEW view_comenzi_utilizatori AS
SELECT
    co.id_comanda,
    u.id_utilizator,
    u.nume,
    u.prenume,
    u.email,
    co.data_comanda,
    co.status,
    co.total,
    co.adresa_livrare
FROM comenzi co
         JOIN utilizatori u ON co.id_utilizator = u.id_utilizator;