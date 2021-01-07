const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login/google', Controller.loginGoogle)

module.exports = router