const axios = require('axios')

const { Song } = require('../models')

const iTunesAPI = 'https://itunes.apple.com/search'

class Controller {

    static listSong(req, res, next) {
        Song.findAll({ where: {UserId: req.user.id}})
        .then(songs =>{
            res.status(200).json(songs)
        })
        .catch(err =>{
            next(err)
        })
    }

    static addSong(req, res, next) {
        let body = req.body
        let user = req.user.id

        let songs = {
            title: body.title,
            artist: body.artist,
            album: body.album,
            genre: body.genre,
            releaseDate: body.releaseDate,
            trackId: body.trackId,
            appleStoreUrl: body.appleStoreUrl,
            previewUrl: body.previewUrl,
            artworkUrl: body.artworkUrl,
            trackTimeMillis: body.trackTimeMillis,
            UserId: user
        }
        Song.create(songs)
        .then(songs =>{
            res.status(201).json(songs)
        })
        .catch(err =>{
            next(err)
        })
    }

    static getSongById(req, res, next) {
        let id = +req.params.id
        Song.findByPk(id)
        .then(songs =>{
            res.status(200).json(songs)
        })
        .catch(err =>{
            next(err)
        })
    }

    static searchSong(req, res, next) {
        axios.get(iTunesAPI, {
            params: {
                term: req.query.q,
                // limit: 20,
                media: 'music'
            }
        })
        .then(response => {
            let songs = response.data.results.filter(data => data.kind === 'song')
            let results = songs.map(song => {
            return {
                title: song.trackName,
                artist: song.artistName,
                album: song.collectionName,
                genre: song.primaryGenreName,
                releaseDate: song.releaseDate,
                trackId: song.trackId,
                appleStoreUrl: song.trackViewUrl,
                previewUrl: song.previewUrl,
                artworkUrl: song.artworkUrl100,
                trackTimeMillis: song.trackTimeMillis
            }
            })
            if(results.length > 0) {
                res.status(200).json(results)
            } else {
                next({ name: 'NotFound' })
            }
        })
        .catch(error => {
            next(error)
        })
    }
}
module.exports = Controller