import express from 'express'
import 'dotenv/config'

import router from './router/filmes.route.js';

const app = express()
const port = process.env.API_PORT || 3000;

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/filmes', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
