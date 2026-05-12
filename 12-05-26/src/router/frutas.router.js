const express = require("express");

const router = express.Router();

const {
    buscarFrutasCliente
} = require("../services/frutas.service");

router.get("/frutas/:id", async (req, res) => {

    try {

        const resultado =
            await buscarFrutasCliente(
                req.params.id
            );

        res.json(resultado);

    } catch (erro) {

        console.log(erro);

        res.status(500).json({
            erro: "Erro no servidor"
        });

    }

});

module.exports = router;

app.listen(3000, () => {
    console.log('API rodando na porta 3000');
});