const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    servidor: 'config-server',
    porta: 3000,
    status: 'ativo',
    endpoints: ['GET /config']
  });
});

router.get('/status', (req, res) => {
  res.json({ status: 'Servidor de configuração online!' });
});

module.exports = router;
