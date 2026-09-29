import { Router } from "express"; 
import { usuarioController } from "../controller/usuarioController.js"; 

const router = Router();

router.post('/login', usuarioController.login);
router.get('/usuarios', usuarioController.getAll); 
router.get('/:id', usuarioController.get); 

export default router;
