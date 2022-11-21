const express = require("express");
const { User, Song, Album, Playlist, Comment } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth")
const { check } = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")

//get all songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs)
});

//get all songs from current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const songs = await Song.findAll({
        where: {
            userId: userId,
        }
    })
    res.json(songs)
})

//get details of song from an Id
router.get('/:songId', async (req, res, next) => {
// first get songId then query for it
// if not song (no song from query) then create 404 error
    const song = await Song.findByPk(req.params.songId);

    if (song) {
        return res.json(song)
    } else {
        const err = new Error("Song does not exist")
        err.status = 404;
        return next(err);
    }

})

//create and return a new song with or without an album
const validateSong = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Song title is required'),
    check('url')
      .exists({ checkFalsy: true })
      .withMessage('Audio is required'),
    handleValidationErrors
  ];

router.post('/', requireAuth, validateSong, async (req, res, next) => {
    const { title, description, url, imageUrl, albumId } = req.body;

    if (albumId) {
        const album = await Album.findByPk(albumId);

        if (!album) {
            const err = new Error("Album could't be found");
            err.status = 404;
            return next(err);
        }
    }

    const song = await Song.create({
        title,
        description,
        url,
        imageUrl,
        albumId,
    })

    res.json(song);
})

//updates and returns an existing song
router.put('/:songId', requireAuth, validateSong, async (req, res) => {
//query for song, => series of if statements
    const userId = req.user.id;
    const song = await Song.findByPk(req.params.songId);
    const { title, description, url, imageUrl, albumId } = req.body;

    if (!song) {
        const err = new Error("Song could't be found");
            err.status = 404;
            return next(err);
    }

    if (userId !== song.userId) {
        const err = new Error("You don't own this song");
            err.status = 403;
            return next(err);
    }

    song.title = title;
    song.description = description;
    song.url = url;
    song.imageUrl = imageUrl;
    song.albumId = albumId;

    await song.save(); // changes made in lines 86 - 90 saved to be permanent
    res.json(song); // return
})

//deletes an existing song
router.delete('/:songId', requireAuth, async (req, res, next) => {
//check req.user.id so that user is the correct user of song compare req.user.id w/ songs user.id
// query for song and if you can find, .destroy it (await *quweryname*.destroy())
    const userId = req.user.id;
    const song = await Song.findByPk(req.params.songId);

    if (userId !== song.userId) {
        const err = new Error("You don't own this song");
            err.status = 403;
            return next(err);
    }

    if (song) {
        await song.destroy();
    }

    await song.save();
    res.json(song);
})

module.exports = router;
