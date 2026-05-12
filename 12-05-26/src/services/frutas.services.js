const pool = require("../config/db");

async function buscarFrutasCliente(id) {

    const resultado = await pool.query(`
        SELECT
            bd_client.nome,
            bd_frutas.nome_fruta
        FROM vendas

        INNER JOIN bd_client
            ON bd_client.id_client =
               vendas.bd_client_id_client

        INNER JOIN bd_frutas
            ON bd_frutas.id_frutas =
               vendas.bd_frutas_id_frutas

        WHERE bd_client.id_client = $1
    `, [id]);

    return resultado.rows;
}

module.exports = {
    buscarFrutasCliente
};