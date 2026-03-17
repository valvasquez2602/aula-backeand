const express = require('express');
const router = express.Router();

// Lista frutas
router.get('/', (req, res) => {
  res.json([
    { id: 1, nome: 'Maçã', preco: 5.00 },
    { id: 2, nome: 'Banana', preco: 3.50 },
    { id: 3, nome: 'Uva', preco: 12.00 }
  ]);
});

// Fruta por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const frutas = [
    { id: 1, nome: 'Maçã', preco: 5.00 },
    { id: 2, nome: 'Banana', preco: 3.50 },
    { id: 3, nome: 'Uva', preco: 12.00 }
  ];
  const fruta = frutas.find(f => f.id === id);
  if (fruta) {
    res.json(fruta);
  } else {
    res.status(404).json({ erro: 'Fruta não encontrada' });
  }
});

module.exports = router;
