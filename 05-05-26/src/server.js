import express from 'express'
import 'dotenv/config'
import frutasRouter from './routes/frutas.router.js'

const app = express()
const PORT = process.env.API_PORT
app.use(express.json())

app.get("/", (req, res) => {
    return res.json("Hello World!")
})

app.use("/frutas", frutasRouter)

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
})
