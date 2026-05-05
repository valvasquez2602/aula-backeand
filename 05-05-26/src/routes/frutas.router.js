import { Router } from 'express'; 
import { frutasService } from '../services/frutas.Service.js';

export const frutasRouter = Router();


frutasRouter.get('/', (req, res) => {
    const { id } = req.params;
    const fruta = frutasService.getById(id);
    if (!fruta) {
        return res.status(404).json({ message: 'Fruta não encontrada' });
    }
    res.json(fruta);
});

frutasRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const fruta = frutasService.getById(id);
    if (!fruta) {
        return res.status(404).json({ message: 'Fruta não encontrada' });
    }
    res.json(fruta);
});


frutasRouter.post('/', async (req, res) => {
    const newFruta = await frutasService.create(req.body.nome);
    res.status(201).json(newFruta);
});


frutasRouter.put('/:id', async (req, res) => {
    const updated = await frutasService.update(
        req.params.id,
        req.body.nome
    );
    res.json(updated);
});


frutasRouter.delete('/:id', async (req, res) => {
    const deleted = await frutasService.delete(req.params.id);
    res.json({ success: deleted });
});

export default frutasRouter;
