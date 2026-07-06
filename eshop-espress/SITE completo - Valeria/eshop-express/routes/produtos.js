import express from 'express';
const router = express.Router();

import { produtos } from '../data/mockDb.js';

router.get('/', (req, res) => {
    let resultado = [...produtos];
    const busca = req.query.busca;
    const categoria = req.query.categoria;
    const ordem = req.query.ordem;

    if (busca) resultado = resultado.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
    if (categoria) resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    if (ordem) {
        if (ordem === 'crescente') resultado.sort((a, b) => a.preco - b.preco);
        if (ordem === 'decrescente') resultado.sort((a, b) => b.preco - a.preco);
    }
    res.json(resultado);
});

// 2. GET /api/produtos/:id -
router.get('/:id', (req, res) => {
    const idProd = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === idProd);
    if (produto) res.json(produto);
    else res.status(404).json({ mensagem: "Não encontrado" });
});

// 3. POST /api/produtos -
router.post('/', (req, res) => {
    const { nome, preco, estoque, categoria } = req.body;
    
    const novoProduto = {
        id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1, // Gera ID sequencial simples
        nome,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        categoria,
        avaliacoes: [],
        mediaAvaliacao: 0
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// 4. PUT /api/produtos/:id -
router.put('/:id', (req, res) => {
    const idProd = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === idProd);

    if (produto) {
        produto.nome = req.body.nome || produto.nome;
        produto.preco = parseFloat(req.body.preco) || produto.preco;
        produto.estoque = parseInt(req.body.estoque) || produto.estoque;
        produto.categoria = req.body.categoria || produto.categoria;
        res.json(produto);
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});

// 5. DELETE /api/produtos/:id - 
router.delete('/:id', (req, res) => {
    const idProd = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === idProd);

    if (index !== -1) {
        produtos.splice(index, 1); 
        res.json({ mensagem: "Removido com sucesso!" });
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});

// 6. POST /api/produtos/:id/avaliacoes -
router.post('/:id/avaliacoes', (req, res) => {
    const idProd = parseInt(req.params.id);
    const nota = parseInt(req.body.nota);
    const produto = produtos.find(p => p.id === idProd);

    if (produto) {
        produto.avaliacoes.push(nota);
        
        let soma = 0;
        for (let n of produto.avaliacoes) {
            soma += n;
        }
        produto.mediaAvaliacao = soma / produto.avaliacoes.length;

        res.json(produto);
    } else {
        res.status(404).json({ mensagem: "Produto não encontrado" });
    }
});

export default router;