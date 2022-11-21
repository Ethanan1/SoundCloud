const express = require("express");
const { User, Song, Album, Playlist, Comment } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth")
const { check } = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")
const app = require ('../../app')

const validateAlbum = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Song title is required'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
      check('imageUrl')
      .exists({ checkFalsy: true })
      .withMessage('Image Url is required'),
    handleValidationErrors
  ];

//returns all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll();
    res.json(albums)
});

//get all albums created by current user
router.get('/:userId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const albums = await Album.findAll({
        where: {
            userId: userId,
        }
    })
    res.json(albums)
})

//get albums of artist from an ID
router.get('/:artistId', async (req, res, next) => {

        const albums = await Album.findByPk(req.params.artistId);

        if (albums) {
            return res.json(albums)
        } else {
            const err = new Error("artist couldn't be found")
            err.status = 404;
            return next(err);
        }

    })

//get details of album from an ID
router.get('/:artistId', async (req, res, next) => {

    const albums = await Album.findByPk(req.params.artistId);

    if (albums) {
        return res.json(albums)
    } else {
        const err = new Error("User album does not exist")
        err.status = 404;
        return next(err);
    }

})

//create an album
router.post('/', requireAuth, validateAlbum, async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const { user } = req;

    const album = await Album.create({
        userId: user.id,
        title,
        description,
        previewImage: imageUrl,
    })

    return res.json(album);
})

//updates and returns an existing album
router.put('/:albumId', requireAuth, validateAlbum, async (req, res) => {
    //query for album, => series of if statements
        const userId = req.user.id;
        const album = await Album.findByPk(req.params.albumId);
        const { title, description, imageUrl } = req.body;

        if (!album) {
            const err = new Error("Album could't be found");
                err.status = 404;
                return next(err);
        }

        if (userId !== album.userId) {
            const err = new Error("You don't own this album");
                err.status = 403;
                return next(err);
        }

        album.title = title;
        album.description = description;
        album.imageUrl = imageUrl;

        await album.save(); // changes made in lines 86 - 90 saved to be permanent
        res.json(album); // return
    })

//delete an album
router.delete('/:albumId', requireAuth, async (req, res) => {
        const userId = req.user.id;
        const album = await Album.findByPk(req.params.albumId);

        if (userId !== album.userId) {
            const err = new Error("You don't own this album");
                err.status = 403;
                return next(err);
        }

        if (album) {
            await album.destroy();
        }

        await album.save();
        res.json(album);
    })

module.exports = router;
