const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
const configRoutes = require('../routes/routes');

app.use('/config', configRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API configurada e rodando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
