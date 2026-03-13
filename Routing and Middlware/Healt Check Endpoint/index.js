require('dotenv').config();
const PORT = process.env.PORT || 9000


const express = require('express')
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Health Check Endpoint')
})

app.get("/health", (req, res) => {
    res.json({ status: 'OK', uptime: process.uptime(), timestamp: new Date().toISOString() })
})

app.get('/info', (req, res) => {
    res.json({ node: process.version, platform: process.platform })
})

app.get('/env', (req, res) => {
    res.json({ enviroment: process.env.NODE_ENV || 'develoopment' })
})

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`)
})