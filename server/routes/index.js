const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const songsRouter = require('./songRouter')
const {authentication} = require('../middlewares/auth')

router.use('/', userRouter)
router.use(authentication)
router.use('/songs', songsRouter)

module.exports = router
