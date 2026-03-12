const express = require('express')
const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    res.send("HEllo Express !!!!")
})

router.get('/home', (req, res) => {
    res.json({ name: 'My API', version: '1.0' })
})

module.exports = router;