const express = require('express')
const router = express.Router()
const Controller = require('../controllers/songController')

router.get('/listSong', Controller.listSong)
router.post('/addSong', Controller.addSong)
router.get('/getSongById', Controller.getSongById)
router.get('/searchSong', Controller.searchSong)

module.exports = router