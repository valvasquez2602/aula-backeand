const express = require('express');
const routes = require('./routes/routes');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API Frutas rodando!' });
});

app.listen(PORT, () => {
  console.log(`Servidor Frutas rodando em http://localhost:${PORT}`);
});
