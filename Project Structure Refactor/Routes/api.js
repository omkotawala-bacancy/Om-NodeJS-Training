const express = require('express')
const router = express.Router()

router.use(express.json())

router.get('/status', (req, res) => {
    res.json({ok: true})
})

module.exports = router ;