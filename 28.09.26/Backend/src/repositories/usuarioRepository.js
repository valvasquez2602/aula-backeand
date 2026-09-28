import { db } from '../config/db.js';

async function buscarPorEmail(email) {
    const resultado = await db.query('SELECT * FROM usuarios WHERE email = \$1', [email]);
    return resultado.rows[0];
}

async function salvar(usuario) {
    const query = `
        INSERT INTO usuarios (nome, email, senha) 
        VALUES ($1, $2, $3) RETURNING id, nome, email`;
    const valores = [usuario.nome, usuario.email, usuario.senha];
    const resultado = await db.query(query, valores);
    return resultado.rows[0];
}

export default { buscarPorEmail, salvar };
