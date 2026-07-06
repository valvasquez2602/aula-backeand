import express from 'express';
const router = express.Router();

import { produtos } from '../data/mockDb.js';

router.get('/', (req, res) => {
    if (!req.session.carrinho) {
        req.session.carrinho = [];
    }

    let total = 0;
    for (let item of req.session.carrinho) {
        total += item.preco * item.quantidade;
    }

    res.json({
        itens: req.session.carrinho,
        total: total
    });
});

// POST /api/carrinho -
router.post('/', (req, res) => {
    const idProd = parseInt(req.body.id);
    const produtoOriginal = produtos.find(p => p.id === idProd);

    if (!produtoOriginal) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    if (produtoOriginal.estoque < 1) {
        return res.status(400).json({ mensagem: "Estoque esgotado!" });
    }

    if (!req.session.carrinho) {
        req.session.carrinho = [];
    }

    const itemNoCarrinho = req.session.carrinho.find(item => item.id === idProd);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        req.session.carrinho.push({
            id: produtoOriginal.id,
            nome: produtoOriginal.nome,
            preco: produtoOriginal.preco,
            quantidade: 1
        });
    }

    res.json({ mensagem: "Adicionado!" });
});

// POST /api/carrinho/finalizar 
router.post('/finalizar', (req, res) => {
    if (!req.session.usuarioLogado) {
        return res.status(401).json({ mensagem: "Precisa fazer login!" });
    }

    if (!req.session.carrinho || req.session.carrinho.length === 0) {
        return res.status(400).json({ mensagem: "Carrinho vazio!" });
    }

    for (let item of req.session.carrinho) {
        const prod = produtos.find(p => p.id === item.id);
        if (prod) {
            prod.estoque -= item.quantidade;
        }
    }

    req.session.carrinho = [];

    res.json({ mensagem: "Compra finalizada com sucesso!" });
});

export default router;