import express from 'express';
import { cadastrar, login } from '../controllers/usuarioControllers.js';

const router = express.Router();

router.post('/usuarios/cadastro', cadastrar);
router.post('/usuarios/login', login);

export default router;
