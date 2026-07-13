import express from 'express';
import { listartodos, buscarporId, criar, atualizar, deletar } from "../services/Motoristas.services.js";

const router = express.Router(); 

router.get("/", (req, res) => {
    res.status(200).json(listartodos());
});

router.get("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        res.status(200).json(buscarporId(id));
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/", (req, res) => {
    try {
        const { nome } = req.body;
        res.status(201).json(criar(nome));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome } = req.body;
        res.status(200).json(atualizar(id, nome));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        res.status(200).json(deletar(id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
