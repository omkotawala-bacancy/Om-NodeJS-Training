const express = require('express')
const router = express.Router()

const userController = require('../Controllers/userController')

router.get('/users', userController.getUser)
router.post('/users', userController.createUser)

module.exports = router