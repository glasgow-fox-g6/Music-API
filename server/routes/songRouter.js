const express = require('express')
const router = express.Router()
const Controller = require('../controllers/songController')

router.get('/', Controller.listSong)
router.post('/', Controller.addSong)
router.get('/search', Controller.searchSong)
router.get('/:id', Controller.getSongById)

module.exports = router
