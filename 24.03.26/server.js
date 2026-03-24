const express = require('express');
const router = express.Router();

const comidas  = [
    { id: 1, nome: 'Pizza', preco: 30.00 },
    { id: 2, nome: 'Hambúrguer', preco: 25.00 },
    { id: 3, nome: 'Sushi', preco: 50.00 }
];

router.get('/comidas', (req, res) => {
    res.json(comidas);
});
 
module.exports = router;