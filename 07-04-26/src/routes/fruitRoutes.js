import express from 'express'
import { fruitService } from '../services/fruit.service.js'

const route = express.Router()

route.get("/", (req, res) => {
    const data = fruitService.getAll()
    res.json(data)
})


route.post("/", (req, res) => {
    const { nome } = req.body
    if (!nome) {
        return res.status(400).json({ message: "O nome da fruta é obrigatório" })
    }
    const newFruit = fruitService.create(nome)
    res.status(201).json(newFruit)
})

route.get("/:id", (req, res) => {
    const { id } = req.params
    const fruit = fruitService.getById(id)
    if (!fruit) return res.status(404).json({ message: "Fruta não encontrada" })
    res.json(fruit)
})

route.put("/:id", (req, res) => {
    const { id } = req.params
    const { nome } = req.body
    
    if (!nome) return res.status(400).json({ message: "O nome é obrigatório" })
    
    const updatedFruit = fruitService.update(id, nome)
    if (!updatedFruit) return res.status(404).json({ message: "Fruta não encontrada" })
    
    res.json(updatedFruit)
})


route.patch("/:id", (req, res) => {
    const { id } = req.params
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ message: "O nome é obrigatório" })
    }

    const updatedFruit = fruitService.updatedPatch(id, nome)

    if (!updatedFruit) {
        return res.status(404).json({ message: "Fruta não encontrada" })
    }

    res.json(updatedFruit)
})




route.delete("/:id", (req, res) => {
    const { id } = req.params
    const deletedFruit = fruitService.delete(id)
    
    if (!deletedFruit) return res.status(404).json({ message: "Fruta não encontrada" })
    
    res.json({ message: `Fruta '${deletedFruit.nome}' deletada com sucesso` })
})

export default route