CREATE DATABASE api_animal;

CREATE TABLE animais(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    idade INT,
    status_saude VARCHAR(50) DEFAULT 'Saudável'
);

INSERT INTO animais (nome, especie, idade, status_saude) VALUES
('Pipoca', 'Canguru', 2, 'Saudável'),
('Amora', 'Panda-vermelho', 3, 'Saudável'),
('Paçoca', 'Capivara', 1, 'Saudável'),
('Foguinho', 'Raposa', 4, 'Saudável'),
('Floquinho', 'Urso-polar', 2, 'Saudável'),
('Pingo', 'Pinguim-imperador', 1, 'Em observação'),
('Biscoito', 'Guaxinim', 3, 'Saudável'),
('Mel', 'Lontra', 2, 'Saudável'),
('Jujuba', 'Flamingo', 5, 'Saudável'),
('Algodão', 'Ovelha-de-jacob', 1, 'Saudável');