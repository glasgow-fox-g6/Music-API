const express = require('express')
const router = express.Router()
const Controller = require('../controllers/songController')

router.get('/songs', Controller.listSong)
router.post('/songs', Controller.addSong)
router.get('/songs/:id', Controller.getSongById)
router.get('/songs/search', Controller.searchSong)

module.exports = router
