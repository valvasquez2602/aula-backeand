const fruits = [
    { id: 1, nome: "Maça" },
    { id: 2, nome: "Pera" }
]

class FruitService {
    getAll() {
        return fruits
    }

    getById(id) {
        return fruits.find(f => f.id === parseInt(id))
    }

    create(nome) {
        const newFruit = {
            id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
            nome
        }
        fruits.push(newFruit)
        return newFruit
    }

    // Atualiza uma fruta existente (Método PUT)
    update(id, nome) {
        const index = fruits.findIndex(f => f.id === parseInt(id))
        if (index !== -1) {
            fruits[index] = { id: parseInt(id), nome }
            return fruits[index]
        }
        return null
    }



    updatedPatch(id, nome) {
        const index = fruits.findIndex(f => f.id === parseInt(id))

        if (fruits === -1) return null

        if (nome !== undefined) {
            fruits[index].nome = nome
        }

        return fruits[index]
    }




    // Remove uma fruta do array (Método DELETE)
    delete(id) {
        const index = fruits.findIndex(f => f.id === parseInt(id))
        if (index !== -1) {
            // Remove o item e retorna o objeto removido
            return fruits.splice(index, 1)[0]
        }
        return null
    }
}

export const fruitService = new FruitService()