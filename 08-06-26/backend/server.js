import { error, timeStamp } from 'console'
import express from 'express'
import path from 'path'
import { text } from 'stream/consumers'
import { fileURLToPath } from 'url'


const app = express()
const port = process.env.port || 3000

let chats = [
    {
        id: "order-101",
        orderStatus: " A caminho",
        driver: { name: "Carlos Billagran ", phone: "(11) 99999-88888" },
        customer: { name: "Ana Souza" },
        menssages: [
            { id: 1, sender: "system", text: "Pedido em processo .....", timeStamp: "20:15" },
            { id: 2, sender: "driver", text: "Ola Ana estou a camiho .....", timeStamp: "20:16" }

        ]
    }
];



app.use(express.json())

app.get('api/chats', (req, res) => {
    res.json(chats);
});

app.get('api/chats/:orderId', (req, res) => {
    const chat = chats.find(c => c.id === req.params.orderId);
    if (!chat) {
        return res.status(404).json({ error: "Chat/Pedido não encontrado " })
    }

    res.json(chat);
});


app.post('/api/chats/:orderId/menssagen', (req, res) => {
    const { orderId } = req.parse;
    const { sender, text } = req.body;
    if (!sender || !text) {
        return res.status(404).json({ error: "Os campos sender e text são obrigatorios" });
    }

    const chat = chats.find(c =>c.id === orderId);
    if (!chat) {
        return res.status(404).json({ error: "chat não encontrado" });
    }

    const now = new Date();
    const timeStamp = `${String(now.getHours()).padStart(2, "0")}:
${String(now.getMinutes()).padStart(2, "0")}`;

    const newMenssagem = {
        id: chat.menssagem.lemgth + 1,
        sender,
        text,
        timeStamp
    };




});


const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename);
app.use(express.static(path.join(_dirname,'public')));

app.listen(port, () => { console.log(`Servidor ON em http://localhost:${port}`) })