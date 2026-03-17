const express = require('express');
const router = express.Router();

router.get('/frutas', (req, res) => {
  res.json([
    { id: 1, nome: 'Maçã', cor: 'Vermelha' },
    { id: 2, nome: 'Banana', cor: 'Amarela' },
    { id: 3, nome: 'Laranja', cor: 'Laranja' }
  ]);
});

module.exports = router;
