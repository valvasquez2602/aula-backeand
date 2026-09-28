import usuarioService from '../service/usuarioService.js';

export async function cadastrar(req, res) {
    try {
        const novoUsuario = await usuarioService.cadastrar(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

export async function login(req, res) {
    try {
        const resultado = await usuarioService.login(req.body.email, req.body.senha);
        res.json({ mensagem: "Login bem-sucedido!", usuario: resultado });
    } catch (error) {
        res.status(401).json({ erro: error.message });
    }
}
