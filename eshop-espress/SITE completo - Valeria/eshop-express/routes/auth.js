import express from 'express';
const router = express.Router();

import { usuarios } from '../data/mockDb.js';

router.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const achou = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (achou) {
        req.session.usuarioLogado = achou; 
        res.json({ mensagem: "Logado!" });
    } else {
        res.status(401).json({ mensagem: "Incorreto!" });
    }
});


router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ mensagem: "Deslogado!" });
});



router.get('/me', (req, res) => {
    if (req.session.usuarioLogado) {
        res.json(req.session.usuarioLogado);
    } else {
        res.json(null);
    }
});

export default router;