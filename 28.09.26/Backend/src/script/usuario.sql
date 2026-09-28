
CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial NOT NULL,
    nome character varying NOT NULL,
    email character varying NOT NULL,
    senha character varying NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.filmes
(
    id serial NOT NULL,
    titulo character varying NOT NULL,
    sinopse text NOT NULL,
    genero character varying NOT NULL,
    nota integer NOT NULL,
    url_imagem text NOT NULL,
    usuario_id integer NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.filmes
    ADD FOREIGN KEY (usuario_id)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;

INSERT INTO public.usuarios (nome, email, senha) 
VALUES ('Usuário Teste', 'teste@email.com', 'senha123');


INSERT INTO public.filmes (titulo, sinopse, genero, nota, url_imagem, usuario_id) VALUES
('Interestelar', 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.', 'Ficção Científica', 5, 'https://justwatch.com', 1),

('O Cavaleiro das Trevas', 'Com a ajuda de Jim Gordon e Harvey Dent, Batman mantém a ordem em Gotham até que um jovem criminoso conhecido como Coringa joga a cidade no caos.', 'Ação', 5, 'https://justwatch.com', 1),

('A Origem', 'Um ladrão que rouba segredos corporativos por meio do uso de tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.', 'Ficção Científica', 5, 'https://justwatch.com', 1),

('Clube da Luta', 'Um homem deprimido que sofre de insônia conhece um estranho vendedor de sabonetes chamado Tyler Durden e localiza um clube de combate secreto.', 'Drama', 5, 'https://justwatch.com', 1),

('O Poderoso Chefão', 'O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.', 'Drama', 5, 'https://justwatch.com', 1),

('Matrix', 'Um hacker de computador aprende com misteriosos rebeldes sobre a verdadeira natureza de sua realidade e seu papel na guerra contra seus controladores.', 'Ficção Científica', 5, 'https://justwatch.com', 1),

('Parasita', 'A ganância e a discriminação de classe ameaçam o relacionamento simbiótico recém-formado entre a rica família Park e o clã Kim, que vive na pobreza.', 'Suspense', 5, 'https://justwatch.com', 1),

('Whiplash: Em Busca da Perfeição', 'Um jovem baterista promissor se inscreve em um conservatório de música cruel, onde suas ambições são orientadas por um instrutor que não para por nada.', 'Drama', 4, 'https://justwatch.com', 1),

('Vingadores: Ultimato', 'Após os eventos devastadores de Guerra Infinita, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo.', 'Ação', 4, 'https://justwatch.com', 1),

('O Show de Truman', 'Um vendedor de seguros descobre que toda a sua vida é, na verdade, um reality show de televisão transmitido para todo o mundo 24 horas por dia.', 'Comédia Drama', 4, 'https://justwatch.com', 1);

	
SELECT * FROM public.filmes;
