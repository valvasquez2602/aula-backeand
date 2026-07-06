import express from "express";
import session from "express-session"; 
import path from "path"; 
import { fileURLToPath } from "url"; 

import rotasProdutos from './routes/produtos.js';
import rotasAuth from './routes/auth.js';
import rotasCarrinho from './routes/carrinho.js';

const app = express();
const PORT = 3002; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());


app.use(session({
    secret: 'chave-secreta-loja',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(express.static(path.join(__dirname, 'public')));

// Suas rotas da API
app.use('/api/produtos', rotasProdutos);
app.use('/api', rotasAuth);
app.use('/api/carrinho', rotasCarrinho); 

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});