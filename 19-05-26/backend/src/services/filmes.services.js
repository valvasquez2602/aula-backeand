import pool from '../config/db.js';

class FilmesService {
  async create({ nome_filme, categoria_filme }) {
    try {
      const query = `
        INSERT INTO db_filme (nome_filme, categoria_filme) 
        VALUES ($1, $2) 
        RETURNING *
      `;
      const values = [nome_filme, categoria_filme];
      const { rows } = await pool.query(query, values);
      return rows[0]; 
    } catch (error) {
      throw new Error(`Erro ao criar filme: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM db_filme');
      return rows;
    } catch (error) {
      throw new Error(`Erro ao listar filmes: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const query = 'SELECT * FROM db_filme WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao buscar filme: ${error.message}`);
    }
  }

  async update(id, { nome_filme, categoria_filme }) {
    try {
      const query = `
        UPDATE db_filme 
        SET nome_filme = $1, categoria_filme = $2 
        WHERE id = $3 
        RETURNING *
      `;
      const values = [nome_filme, categoria_filme, id];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar filme: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const query = 'DELETE FROM db_filme WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Erro ao deletar filme: ${error.message}`);
    }
  }
}

export const filmesService = new FilmesService();
