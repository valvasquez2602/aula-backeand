import express from 'express'
import fruitRoutes from './routes/fruitRoutes.js'

const app = express()
const port = 3000

app.use(express.json())

app.use("/fruits", fruitRoutes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})