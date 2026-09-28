import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'catalogo_filme',
    password: 'senai',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error(' Erro ao conectar ao PostgreSQL:', err.stack);
    }
    console.log(' Conexão com o banco de dados PostgreSQL estabelecida com sucesso!');
    release();
});

export const db = {
    query: (text, params) => pool.query(text, params),
};
