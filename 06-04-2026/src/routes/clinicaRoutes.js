

import express from 'express'
import { clinicasService } from '../services/clinicas.service.js'

const route = express.Router()

// GET: Listar todas
route.get("/", (req, res) => {
    const data = clinicasService.getAll()
    res.json(data)
})

// POST: Criar nova
route.post("/", (req, res) => {
    const { nome, especialidade } = req.body

    if (!nome || !especialidade) {
        return res.status(400).json({ message: "Nome e especialidade são obrigatórios" })
    }

    const newClinica = clinicasService.create(nome, especialidade)
    res.status(201).json(newClinica)
})

// GET: Buscar por ID
route.get("/:id", (req, res) => {
    const { id } = req.params
    const clinica = clinicasService.getById(id)

    if (!clinica) {
        return res.status(404).json({ message: "Clínica não encontrada" })
    }

    res.json(clinica)
})

// PUT: Atualizar
route.put("/:id", (req, res) => {
    const { id } = req.params
    const { nome, especialidade } = req.body

    if (!nome || !especialidade) {
        return res.status(400).json({ message: "Nome e especialidade são obrigatórios" })
    }

    const updatedClinica = clinicasService.update(id, nome, especialidade)

    if (!updatedClinica) {
        return res.status(404).json({ message: "Clínica não encontrada" })
    }

    res.json(updatedClinica)
})

// DELETE
route.delete("/:id", (req, res) => {
    const { id } = req.params
    const deletedClinica = clinicasService.delete(id)

    if (!deletedClinica) {
        return res.status(404).json({ message: "Clínica não encontrada" })
    }

    res.json({ message: `Clínica '${deletedClinica.nome}' deletada com sucesso` })
})

export default route