import express from 'express';
import { filmesService } from '../services/filmes.services.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const novoFilme = await filmesService.create(req.body);
    res.status(201).json(novoFilme);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const filmes = await filmesService.getAll();
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const filme = await filmesService.getById(req.params.id);
    if (!filme) {
      return res.status(404).json({ mensagem: 'Filme não encontrado' });
    }
    res.json(filme);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});



router.put('/:id', async (req, res) => {
  try {
    const filmeAtualizado = await filmesService.update(req.params.id, req.body);
    if (!filmeAtualizado) {
      return res.status(404).json({ mensagem: 'Filme não encontrado' });
    }
    res.json(filmeAtualizado);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const filmeDeletado = await filmesService.delete(req.params.id);
    if (!filmeDeletado) {
      return res.status(404).json({ mensagem: 'Filme não encontrado' });
    }
    res.json({ mensagem: 'Filme removido com sucesso', filme: filmeDeletado });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

export default router;
