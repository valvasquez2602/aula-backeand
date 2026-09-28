import express from 'express';
import cors from 'cors';
import usuarioRoutes from '../routes/usuarioRoute.js'; 

const app = express();

app.use(express.json());
app.use(cors());

app.use(usuarioRoutes);

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(` Servidor rodando com sucesso na porta ${PORTA}!`);
});
