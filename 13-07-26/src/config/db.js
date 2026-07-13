import db from "./db.js";

export const listartodos = () => {
    return db.motoristas;
};

export const buscarporId = (id) => {
    const motorista = db.motoristas.find(u => u.id === id);
    if (!motorista) throw new Error("Motorista não encontrado");
    return motorista;
};

export const criar = (nome) => {
    if (!nome) throw new Error("Nome é obrigatório");

    const novomotorista = {
        id: db.motoristas.length > 0 ? db.motoristas[db.motoristas.length - 1].id + 1 : 1,
        nome
    };

    db.motoristas.push(novomotorista);
    return novomotorista;
};

export const atualizar = (id, nome) => {
    const motoristasindex = db.motoristas.findIndex(u => u.id === id);
    if (motoristasindex === -1) throw new Error("Motorista não encontrado para atualizar");

    db.motoristas[motoristasindex].nome = nome || db.motoristas[motoristasindex].nome;
    return db.motoristas[motoristasindex];
};

export const deletar = (id) => {
    const motoristasindex = db.motoristas.findIndex(u => u.id === id);
    if (motoristasindex === -1) throw new Error("Motorista não encontrado para deletar");

    db.motoristas.splice(motoristasindex, 1);
    return { mensagem: `Usuário com ID ${id} removido` };
};
