const express = require("express");
const { User, Song, Album, Playlist, Comment } = require("../../db/models");
const router = express.Router();
const { requireAuth, restoreUser } = require("../../utils/auth")
const { check } = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")
const app = require ('../../app');
const { nextTick } = require("async");

// get all album from artistId
router.get('/:userId/albums', async (req, res) => {

    const { userId } = req.params;
    const artist = await User.findOne({
        where: {
            id: userId
        }
    })

    if (artist) {
        const albums = await Album.findAll({
            where: {
                userId
            },
         })
        return res.json({ Albums:albums })

    } else {
        return res.status(404).json({
            'message': "Artist couldn't be found",
            'statusCode': 404
        })
    }
});



module.exports = router
