const express = require('express')
const app = express()
const PORT = process.env.port || 3000

app.use(express.json());

app.get('/' , (req, res) => {
    res.send('Hello Express!!!')
})

app.get('/about', (req, res) => {
    res.json({name: 'My API', version: 1.0})
})

app.listen(PORT, () => {
    console.log("Server is listening at Port 3000")
})