import express from 'express';
import { cadastrar, login } from '../controllers/usuarioControllers.js';

const router = express.Router();

router.post('/cadastro', cadastrar);
router.post('/login', login);

router.get('/lista', (req, res) => {
    res.status(200).json({
        mensagem: "Lista de usuários recuperada com sucesso!",
        usuarios: []
    });
});

router.delete('/deletar/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        mensagem: `Usuário com ID ${id} deletado com sucesso!`
    });
});





export default router;
