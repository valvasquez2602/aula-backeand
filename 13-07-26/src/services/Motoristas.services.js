let motoristas = [
    { id: 1, nome: "carlos" },
    { id: 2, nome: "julian" }
];

export const listartodos = () => {
    return motoristas;
};

export const buscarporId = (id) => {
    const motorista = motoristas.find(u => u.id === id);
    if (!motorista) throw new Error("Motorista não encontrado");
    return motorista;
};

export const criar = (nome) => {
    if (!nome) throw new Error("Nome é obrigatório");

    const novomotorista = {
        id: motoristas.length > 0 ? motoristas[motoristas.length - 1].id + 1 : 1,
        nome
    };

    motoristas.push(novomotorista);
    return novomotorista;
};

export const atualizar = (id, nome) => {
    const motoristasindex = motoristas.findIndex(u => u.id === id);
    if (motoristasindex === -1) throw new Error("Motorista não encontrado para atualizar");

    motoristas[motoristasindex].nome = nome || motoristas[motoristasindex].nome;
    return motoristas[motoristasindex];
};

export const deletar = (id) => {
    const motoristasindex = motoristas.findIndex(u => u.id === id);
    if (motoristasindex === -1) throw new Error("Motorista não encontrado para deletar");

    motoristas.splice(motoristasindex, 1);
    return { mensagem: `Usuário com ID ${id} removido` };
};
