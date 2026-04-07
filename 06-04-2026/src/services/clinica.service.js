// Mock de dados inicial
const clinicas = [
    { id: 1, nome: "Clínica Vitte", especialidade: "Cardiologia" },
    { id: 2, nome: "Clínica Multi", especialidade: "Terapia" },
    { id: 3, nome: "Clínica Vida", especialidade: "Pediatria" }
]
class clinicasService {
    getAll() {
        return clinicas
    }

    getById(id) {
        return clinicas.find(f => f.id === parseInt(id))
    }

    create(nome,especialidade ) {
        const newclinica = {
            id: clinicas.length > 0 ? clinicas[clinicas.length - 1].id + 1 : 1,
            nome
        }
        clinicas.push(clinica)
        return newclinica
    }

    update(id, nome , especialidade) {
        const index = clinicas.findIndex(f => f.id === parseInt(id))
        if (index !== -1) {
            clinicas[index] = { id: parseInt(id), nome }
            return clinicas[index]
        }
        return null
    }

    delete(id) {
        const index = clinicas.findIndex(f => f.id === parseInt(id))
        if (index !== -1) {
            return clinicas.splice(index, 1)[0]
        }
        return null
    }
}

export const clinicasService = new clinicasService()