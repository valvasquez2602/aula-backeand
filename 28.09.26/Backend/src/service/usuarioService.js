import usuarioRepository from '../repositories/usuarioRepository.js';

async function cadastrar(dadosUsuario) {
    if (!dadosUsuario.nome || !dadosUsuario.email || !dadosUsuario.senha) {
        throw new Error("Todos os campos são obrigatórios.");
    }
    const usuarioExistente = await usuarioRepository.buscarPorEmail(dadosUsuario.email);
    if (usuarioExistente && usuarioExistente.length > 0) {
        throw new Error("Este e-mail já está em uso.");
    }
    return await usuarioRepository.salvar(dadosUsuario);
}

async function login(email, senha) {
    if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
    }
    const usuarios = await usuarioRepository.buscarPorEmail(email);
    const usuario = usuarios[0]; 
    
    if (!usuario || usuario.senha !== senha) {
        throw new Error("E-mail ou senha incorretos.");
    }
    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
}

export default { cadastrar, login };
