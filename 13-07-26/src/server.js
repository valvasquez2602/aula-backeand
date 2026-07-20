import express from 'express';
import routes from './router/Motoristas.route.js';
const app = express();

app.use(express.json());
app.use('/Motoristas', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
