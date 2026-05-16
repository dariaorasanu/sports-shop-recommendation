TRUNCATE TABLE detalii_comanda RESTART IDENTITY CASCADE;
TRUNCATE TABLE comenzi RESTART IDENTITY CASCADE;
TRUNCATE TABLE produse RESTART IDENTITY CASCADE;
TRUNCATE TABLE categorii_produse RESTART IDENTITY CASCADE;
TRUNCATE TABLE recomandari RESTART IDENTITY CASCADE;
TRUNCATE TABLE chestionare RESTART IDENTITY CASCADE;
TRUNCATE TABLE sporturi RESTART IDENTITY CASCADE;
TRUNCATE TABLE utilizatori RESTART IDENTITY CASCADE;



INSERT INTO utilizatori (nume, prenume, data_nastere, email, telefon, parola) VALUES
                                                                          ('Popescu', 'Ana', '2002-04-12', 'ana.popescu@example.com', '0711111111', 'parola123'),
                                                                          ('Ionescu', 'Mihai', '2001-09-20', 'mihai.ionescu@example.com', '0711111112', 'parola123'),
                                                                          ('Dumitrescu', 'Ioana', '2003-01-15', 'ioana.dumitrescu@example.com', '0711111113', 'parola123'),
                                                                          ('Stan', 'Andrei', '2000-11-03', 'andrei.stan@example.com', '0711111114', 'parola123'),
                                                                          ('Georgescu', 'Maria', '2004-06-25', 'maria.georgescu@example.com', '0711111115', 'parola123'),
                                                                          ('Marin', 'Alexandru', '1999-02-17', 'alexandru.marin@example.com', '0711111116', 'parola123'),
                                                                          ('Tudor', 'Elena', '2002-08-08', 'elena.tudor@example.com', '0711111117', 'parola123'),
                                                                          ('Radu', 'Cristian', '2001-12-30', 'cristian.radu@example.com', '0711111118', 'parola123'),
                                                                          ('Matei', 'Bianca', '2003-05-19', 'bianca.matei@example.com', '0711111119', 'parola123'),
                                                                          ('Enache', 'Vlad', '2000-03-22', 'vlad.enache@example.com', '0711111120', 'parola123'),
                                                                          ('Ilie', 'Daria', '2004-10-01', 'daria.ilie@example.com', '0711111121', 'parola123'),
                                                                          ('Munteanu', 'Rares', '1998-07-14', 'rares.munteanu@example.com', '0711111122', 'parola123'),
                                                                          ('Lupu', 'Teodora', '2002-09-09', 'teodora.lupu@example.com', '0711111123', 'parola123'),
                                                                          ('Nistor', 'Paul', '2001-01-28', 'paul.nistor@example.com', '0711111124', 'parola123'),
                                                                          ('Constantin', 'Irina', '2003-04-05', 'irina.constantin@example.com', '0711111125', 'parola123');


INSERT INTO sporturi (denumire, mediu, nivel_efort, tip_activitate, obiectiv_principal, descriere) VALUES
                                                                                                       ('Alergare', 'EXTERIOR', 3, 'INDIVIDUAL', 'REZISTENTA', 'Sport accesibil pentru imbunatatirea rezistentei si conditiei fizice.'),
                                                                                                       ('Inot', 'INTERIOR', 3, 'INDIVIDUAL', 'TONIFIERE', 'Activitate cu impact redus asupra articulatiilor, potrivita pentru tonifiere.'),
                                                                                                       ('Fitness acasa', 'INTERIOR', 2, 'INDIVIDUAL', 'TONIFIERE', 'Antrenamente simple realizate acasa cu echipament minim.'),
                                                                                                       ('Baschet', 'INTERIOR', 4, 'ECHIPA', 'SOCIALIZARE', 'Sport de echipa potrivit pentru coordonare, efort si socializare.'),
                                                                                                       ('Volei', 'INTERIOR', 3, 'ECHIPA', 'SOCIALIZARE', 'Sport de echipa cu nivel moderat de efort.'),
                                                                                                       ('Tenis', 'EXTERIOR', 4, 'INDIVIDUAL', 'COMPETITIE', 'Sport tehnic, potrivit pentru progres individual si competitie.'),
                                                                                                       ('Cycling', 'EXTERIOR', 3, 'INDIVIDUAL', 'REZISTENTA', 'Activitate outdoor pentru rezistenta si mobilitate.'),
                                                                                                       ('Yoga', 'INTERIOR', 1, 'INDIVIDUAL', 'RELAXARE', 'Activitate cu efort redus, potrivita pentru relaxare si flexibilitate.'),
                                                                                                       ('Badminton', 'INTERIOR', 2, 'INDIVIDUAL', 'RELAXARE', 'Sport recreativ, usor de practicat la nivel de incepator.'),
                                                                                                       ('Escalada', 'INTERIOR', 5, 'INDIVIDUAL', 'COMPETITIE', 'Sport solicitant fizic si tehnic, potrivit pentru persoane active.'),
                                                                                                       ('Fotbal', 'EXTERIOR', 5, 'ECHIPA', 'COMPETITIE', 'Sport de echipa cu efort ridicat si componenta competitiva.'),
                                                                                                       ('Pilates', 'INTERIOR', 2, 'INDIVIDUAL', 'TONIFIERE', 'Antrenament controlat pentru postura, tonifiere si mobilitate.'),
                                                                                                       ('Drumetie', 'EXTERIOR', 2, 'INDIVIDUAL', 'RELAXARE', 'Activitate outdoor potrivita pentru relaxare si miscare usoara.'),
                                                                                                       ('Box', 'INTERIOR', 5, 'INDIVIDUAL', 'COMPETITIE', 'Sport intens, potrivit pentru forta, disciplina si competitie.'),
                                                                                                       ('Dans sportiv', 'INTERIOR', 3, 'AMBELE', 'SOCIALIZARE', 'Activitate dinamica, potrivita pentru socializare si coordonare.');


INSERT INTO categorii_produse (denumire, descriere) VALUES
                                                        ('Incaltaminte alergare', 'Pantofi sport pentru alergare si activitati cardio.'),
                                                        ('Incaltaminte indoor', 'Pantofi sport pentru sala si sporturi de interior.'),
                                                        ('Imbracaminte fitness', 'Tricouri, pantaloni si echipamente pentru antrenament.'),
                                                        ('Accesorii hidratare', 'Sticle, bidoane si accesorii pentru hidratare.'),
                                                        ('Mingi', 'Mingi pentru sporturi de echipa.'),
                                                        ('Rachete', 'Rachete pentru tenis si badminton.'),
                                                        ('Echipament protectie', 'Castile, genunchiere, manusi si alte elemente de protectie.'),
                                                        ('Echipament fitness', 'Greutati, gantere, benzi si accesorii pentru fitness.'),
                                                        ('Echipament inot', 'Ochelari, casti si accesorii pentru inot.'),
                                                        ('Cycling', 'Accesorii pentru ciclism.'),
                                                        ('Yoga si Pilates', 'Saltele, blocuri si accesorii pentru yoga sau pilates.'),
                                                        ('Outdoor', 'Echipament pentru drumetii si activitati in aer liber.'),
                                                        ('Box', 'Manusi si accesorii pentru box.'),
                                                        ('Genti sport', 'Genti pentru transportul echipamentului sportiv.'),
                                                        ('Electronice sport', 'Ceasuri, cronometre si accesorii electronice pentru sport.');


INSERT INTO chestionare (
    id_utilizator,
    timp_liber_ore,
    nivel_activitate,
    obiectiv,
    restrictii_medicale,
    buget_estimat,
    preferinta_tip_activitate,
    preferinta_mediu,
    toleranta_efort,
    nivel_utilizator
) VALUES
      (1, 3, 'SEDENTAR', 'RELAXARE', 'fara restrictii', 250.00, 'INDIVIDUAL', 'INTERIOR', 2, 'INCEPATOR'),
      (2, 6, 'MODERAT', 'REZISTENTA', 'fara restrictii', 500.00, 'INDIVIDUAL', 'EXTERIOR', 3, 'MEDIU'),
      (3, 4, 'SEDENTAR', 'TONIFIERE', 'dureri usoare de spate', 350.00, 'INDIVIDUAL', 'INTERIOR', 2, 'INCEPATOR'),
      (4, 8, 'ACTIV', 'COMPETITIE', 'fara restrictii', 800.00, 'ECHIPA', 'EXTERIOR', 5, 'AVANSAT'),
      (5, 5, 'MODERAT', 'SOCIALIZARE', 'fara restrictii', 400.00, 'ECHIPA', 'INTERIOR', 3, 'MEDIU'),
      (6, 7, 'ACTIV', 'COMPETITIE', 'fara restrictii', 900.00, 'INDIVIDUAL', 'INTERIOR', 5, 'AVANSAT'),
      (7, 2, 'SEDENTAR', 'SLABIRE', 'fara restrictii', 200.00, 'INDIVIDUAL', 'INTERIOR', 2, 'INCEPATOR'),
      (8, 6, 'MODERAT', 'REZISTENTA', 'fara restrictii', 600.00, 'INDIVIDUAL', 'EXTERIOR', 4, 'MEDIU'),
      (9, 4, 'MODERAT', 'RELAXARE', 'fara restrictii', 300.00, 'INDIVIDUAL', 'INTERIOR', 2, 'INCEPATOR'),
      (10, 5, 'ACTIV', 'SOCIALIZARE', 'fara restrictii', 450.00, 'ECHIPA', 'INTERIOR', 4, 'MEDIU'),
      (11, 3, 'SEDENTAR', 'TONIFIERE', 'fara restrictii', 300.00, 'INDIVIDUAL', 'INTERIOR', 2, 'INCEPATOR'),
      (12, 9, 'ACTIV', 'COMPETITIE', 'fara restrictii', 1000.00, 'INDIVIDUAL', 'EXTERIOR', 5, 'AVANSAT'),
      (13, 6, 'MODERAT', 'RELAXARE', 'fara restrictii', 350.00, 'INDIVIDUAL', 'EXTERIOR', 2, 'MEDIU'),
      (14, 4, 'MODERAT', 'SOCIALIZARE', 'fara restrictii', 500.00, 'AMBELE', 'INTERIOR', 3, 'MEDIU'),
      (15, 7, 'ACTIV', 'REZISTENTA', 'fara restrictii', 700.00, 'INDIVIDUAL', 'EXTERIOR', 4, 'AVANSAT');


INSERT INTO recomandari (id_chestionar, id_sport, scor_compatibilitate, nivel_recomandat) VALUES
                                                                                              (1, 8, 88.00, 'INCEPATOR'),
                                                                                              (2, 1, 84.50, 'MEDIU'),
                                                                                              (3, 12, 81.00, 'INCEPATOR'),
                                                                                              (4, 11, 90.00, 'AVANSAT'),
                                                                                              (5, 4, 86.00, 'MEDIU'),
                                                                                              (6, 14, 89.50, 'AVANSAT'),
                                                                                              (7, 3, 80.00, 'INCEPATOR'),
                                                                                              (8, 7, 85.00, 'MEDIU'),
                                                                                              (9, 9, 78.50, 'INCEPATOR'),
                                                                                              (10, 5, 82.00, 'MEDIU'),
                                                                                              (11, 3, 83.00, 'INCEPATOR'),
                                                                                              (12, 6, 91.00, 'AVANSAT'),
                                                                                              (13, 13, 79.00, 'MEDIU'),
                                                                                              (14, 15, 87.00, 'MEDIU'),
                                                                                              (15, 1, 88.50, 'AVANSAT');

-- 6. PRODUSE

-- 6. PRODUSE

-- 6. PRODUSE
-- Pentru fiecare sport avem produse pe nivel:
-- 2 produse INCEPATOR, 2 produse MEDIU, 2 produse AVANSAT

INSERT INTO produse (id_categorie, id_sport, denumire, pret, stoc, nivel_recomandat) VALUES
-- 1. Alergare
(1, 1, 'Pantofi alergare basic', 199.99, 25, 'INCEPATOR'),
(4, 1, 'Bidon hidratare alergare', 39.99, 50, 'INCEPATOR'),
(1, 1, 'Pantofi alergare confort', 299.99, 18, 'MEDIU'),
(3, 1, 'Tricou alergare respirabil', 79.99, 30, 'MEDIU'),
(1, 1, 'Pantofi alergare performance', 449.99, 10, 'AVANSAT'),
(14, 1, 'Centura alergare cu buzunar', 89.99, 20, 'AVANSAT'),

-- 2. Inot
(9, 2, 'Casca inot silicon', 49.99, 40, 'INCEPATOR'),
(9, 2, 'Ochelari inot basic', 69.99, 35, 'INCEPATOR'),
(9, 2, 'Ochelari inot anti-aburire', 89.99, 25, 'MEDIU'),
(14, 2, 'Geanta impermeabila inot', 119.99, 20, 'MEDIU'),
(9, 2, 'Set inot avansat', 179.99, 12, 'AVANSAT'),
(3, 2, 'Prosop sport microfibra', 99.99, 18, 'AVANSAT'),

-- 3. Fitness acasa
(8, 3, 'Banda elastica fitness', 39.99, 40, 'INCEPATOR'),
(8, 3, 'Covoras fitness pliabil', 89.99, 25, 'INCEPATOR'),
(8, 3, 'Set gantere 2x5 kg', 149.99, 20, 'MEDIU'),
(8, 3, 'Roata abdomene', 69.99, 22, 'MEDIU'),
(8, 3, 'Set fitness multifunctional', 349.99, 8, 'AVANSAT'),
(8, 3, 'Banca fitness reglabila', 499.99, 6, 'AVANSAT'),

-- 4. Baschet
(5, 4, 'Minge baschet recreativ', 89.99, 30, 'INCEPATOR'),
(3, 4, 'Tricou antrenament baschet', 79.99, 35, 'INCEPATOR'),
(5, 4, 'Minge baschet indoor', 129.99, 20, 'MEDIU'),
(7, 4, 'Manseta sport baschet', 39.99, 25, 'MEDIU'),
(2, 4, 'Pantofi baschet performance', 399.99, 10, 'AVANSAT'),
(5, 4, 'Minge baschet oficiala', 219.99, 12, 'AVANSAT'),

-- 5. Volei
(5, 5, 'Minge volei recreativ', 79.99, 25, 'INCEPATOR'),
(3, 5, 'Tricou volei antrenament', 69.99, 30, 'INCEPATOR'),
(7, 5, 'Genunchiere volei', 69.99, 30, 'MEDIU'),
(5, 5, 'Minge volei sala', 129.99, 20, 'MEDIU'),
(2, 5, 'Pantofi volei sala', 289.99, 12, 'AVANSAT'),
(7, 5, 'Mansete volei', 89.99, 15, 'AVANSAT'),

-- 6. Tenis
(6, 6, 'Set mingi tenis', 49.99, 40, 'INCEPATOR'),
(6, 6, 'Husa racheta tenis', 79.99, 22, 'INCEPATOR'),
(6, 6, 'Racheta tenis aluminiu', 249.99, 18, 'MEDIU'),
(3, 6, 'Tricou tenis respirabil', 89.99, 25, 'MEDIU'),
(6, 6, 'Racheta tenis carbon', 599.99, 7, 'AVANSAT'),
(2, 6, 'Pantofi tenis teren dur', 349.99, 10, 'AVANSAT'),

-- 7. Cycling
(4, 7, 'Bidon ciclism 750ml', 34.99, 45, 'INCEPATOR'),
(10, 7, 'Manusi ciclism basic', 59.99, 30, 'INCEPATOR'),
(10, 7, 'Manusi ciclism gel', 89.99, 25, 'MEDIU'),
(10, 7, 'Casca ciclism reglabila', 179.99, 14, 'MEDIU'),
(10, 7, 'Casca ciclism performanta', 249.99, 10, 'AVANSAT'),
(3, 7, 'Tricou ciclism tehnic', 159.99, 12, 'AVANSAT'),

-- 8. Yoga
(11, 8, 'Bloc yoga din spuma', 39.99, 35, 'INCEPATOR'),
(11, 8, 'Curea yoga pentru stretching', 29.99, 32, 'INCEPATOR'),
(11, 8, 'Saltea yoga antiderapanta', 129.99, 28, 'MEDIU'),
(11, 8, 'Perna yoga meditatie', 99.99, 20, 'MEDIU'),
(11, 8, 'Set yoga premium', 249.99, 12, 'AVANSAT'),
(11, 8, 'Saltea yoga profesionala', 299.99, 10, 'AVANSAT'),

-- 9. Badminton
(6, 9, 'Set fluturasi badminton', 34.99, 50, 'INCEPATOR'),
(6, 9, 'Husa racheta badminton', 49.99, 20, 'INCEPATOR'),
(6, 9, 'Racheta badminton usoara', 89.99, 28, 'MEDIU'),
(2, 9, 'Pantofi badminton sala', 199.99, 14, 'MEDIU'),
(6, 9, 'Racheta badminton carbon', 199.99, 14, 'AVANSAT'),
(6, 9, 'Set badminton competitie', 299.99, 8, 'AVANSAT'),

-- 10. Escalada
(7, 10, 'Magneziu lichid escalada', 44.99, 25, 'INCEPATOR'),
(7, 10, 'Saculet magneziu escalada', 59.99, 18, 'INCEPATOR'),
(7, 10, 'Manusi escalada', 99.99, 16, 'MEDIU'),
(2, 10, 'Incaltaminte escalada indoor', 299.99, 10, 'MEDIU'),
(7, 10, 'Ham escalada indoor', 349.99, 8, 'AVANSAT'),
(7, 10, 'Set carabiniere escalada', 189.99, 12, 'AVANSAT'),

-- 11. Fotbal
(5, 11, 'Minge fotbal recreativ', 79.99, 35, 'INCEPATOR'),
(3, 11, 'Tricou antrenament fotbal', 69.99, 30, 'INCEPATOR'),
(5, 11, 'Minge fotbal teren exterior', 139.99, 26, 'MEDIU'),
(7, 11, 'Aparatori fotbal', 49.99, 28, 'MEDIU'),
(2, 11, 'Ghete fotbal sintetic', 249.99, 12, 'AVANSAT'),
(5, 11, 'Minge fotbal oficiala', 229.99, 15, 'AVANSAT'),

-- 12. Pilates
(11, 12, 'Inel pilates flexibil', 59.99, 40, 'INCEPATOR'),
(11, 12, 'Banda elastica pilates', 39.99, 35, 'INCEPATOR'),
(11, 12, 'Minge pilates', 49.99, 35, 'MEDIU'),
(11, 12, 'Saltea pilates groasa', 149.99, 18, 'MEDIU'),
(11, 12, 'Set pilates premium', 249.99, 12, 'AVANSAT'),
(8, 12, 'Reformer pilates compact', 899.99, 4, 'AVANSAT'),

-- 13. Drumetie
(12, 13, 'Pelerina ploaie drumetie', 89.99, 30, 'INCEPATOR'),
(4, 13, 'Sticla apa drumetie', 49.99, 35, 'INCEPATOR'),
(12, 13, 'Bete trekking ajustabile', 159.99, 20, 'MEDIU'),
(12, 13, 'Rucsac drumetie 20L', 229.99, 16, 'MEDIU'),
(12, 13, 'Rucsac drumetie 30L', 299.99, 12, 'AVANSAT'),
(2, 13, 'Bocanci drumetie', 399.99, 9, 'AVANSAT'),

-- 14. Box
(13, 14, 'Bandaje box elastice', 39.99, 40, 'INCEPATOR'),
(13, 14, 'Coarda sarit box', 49.99, 30, 'INCEPATOR'),
(13, 14, 'Manusi box antrenament', 189.99, 20, 'MEDIU'),
(13, 14, 'Protectie dentara box', 34.99, 25, 'MEDIU'),
(13, 14, 'Set box avansat', 399.99, 8, 'AVANSAT'),
(13, 14, 'Casca protectie box', 229.99, 10, 'AVANSAT'),

-- 15. Dans sportiv
(3, 15, 'Tricou dans respirabil', 69.99, 25, 'INCEPATOR'),
(14, 15, 'Geanta echipament dans', 99.99, 18, 'INCEPATOR'),
(2, 15, 'Pantofi dans sportiv', 229.99, 12, 'MEDIU'),
(3, 15, 'Colanti dans sportiv', 119.99, 20, 'MEDIU'),
(2, 15, 'Pantofi dans competitie', 399.99, 7, 'AVANSAT'),
(3, 15, 'Costum antrenament dans', 249.99, 10, 'AVANSAT');

-- 7. COMENZI

INSERT INTO comenzi (id_utilizator, status, total, adresa_livrare) VALUES
                                                                       (1, 'NOUA', 129.99, 'Strada Independentei 10, Iasi'),
                                                                       (2, 'CONFIRMATA', 199.99, 'Strada Pacurari 22, Iasi'),
                                                                       (3, 'FINALIZATA', 149.99, 'Bulevardul Carol I 5, Iasi'),
                                                                       (4, 'NOUA', 139.99, 'Strada Palat 12, Iasi'),
                                                                       (5, 'CONFIRMATA', 119.99, 'Strada Sf. Lazar 8, Iasi'),
                                                                       (6, 'NOUA', 189.99, 'Strada Nicolina 30, Iasi'),
                                                                       (7, 'FINALIZATA', 149.99, 'Strada Tatarasi 17, Iasi'),
                                                                       (8, 'CONFIRMATA', 179.99, 'Strada Copou 9, Iasi'),
                                                                       (9, 'NOUA', 89.99, 'Strada Moara de Vant 4, Iasi'),
                                                                       (10, 'ANULATA', 99.99, 'Strada Bucium 11, Iasi'),
                                                                       (11, 'FINALIZATA', 129.99, 'Strada Arcu 18, Iasi'),
                                                                       (12, 'NOUA', 249.99, 'Strada Sararie 7, Iasi'),
                                                                       (13, 'CONFIRMATA', 229.99, 'Strada Canta 14, Iasi'),
                                                                       (14, 'NOUA', 89.99, 'Strada Podu Ros 6, Iasi'),
                                                                       (15, 'FINALIZATA', 399.99, 'Strada Socola 21, Iasi');

-- 8. DETALII_COMANDA

INSERT INTO detalii_comanda (id_comanda, id_produs, cantitate, pret_unitar) VALUES
                                                                                (1, 9, 1, 129.99),
                                                                                (2, 1, 1, 199.99),
                                                                                (3, 4, 1, 149.99),
                                                                                (4, 12, 1, 139.99),
                                                                                (5, 5, 1, 119.99),
                                                                                (6, 15, 1, 189.99),
                                                                                (7, 4, 1, 149.99),
                                                                                (8, 8, 1, 179.99),
                                                                                (9, 10, 1, 89.99),
                                                                                (10, 6, 1, 99.99),
                                                                                (11, 9, 1, 129.99),
                                                                                (12, 7, 1, 249.99),
                                                                                (13, 14, 1, 229.99),
                                                                                (14, 3, 1, 89.99),
                                                                                (15, 2, 1, 399.99);