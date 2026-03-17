const express = require('express');
const frutasRoutes = require('./src/routes/frutis');
const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/frutas', frutasRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'Router Service Frutas rodando!' });
});

app.listen(PORT, () => {
  console.log(`Router Service Frutas em http://localhost:${PORT}`);
});
