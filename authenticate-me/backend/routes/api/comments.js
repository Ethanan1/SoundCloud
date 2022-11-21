const express = require("express");
const { User, Song, Album, Playlist, Comment } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth")
const { check } = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")
const app = require ('../../app')

const validateComment = [
    check('songId')
      .exists({ checkFalsy: true })
      .withMessage('Song ID is required'),
    check('userId')
      .exists({ checkFalsy: true })
      .withMessage('User ID is required'),
      check('body')
      .exists({ checkFalsy: true })
      .withMessage('Body is required'),
    handleValidationErrors
  ];

//get comments from songs ID
router.get('/:songId/comments', async (req, res) => {
    const song = await Song.findByPk(req.params.songId);
    const comments = await Comment.findAll(song)

    if (song) {
        return res.json(comments);
    }
})

//create and return new comment for song specified by ID
router.post('/:songId/comment', requireAuth, validateComment, async (req, res, next) => {
    const { body } = req.body;
    const { songId } = req.params;
    const userId = req.user;

    if (body) {
        const song = await Song.findByPk(songId);

        if (!song) {
            const err = new Error('No song found')
            err.status = 404;
            return next(err);
        }
    }
    const comment = await Comment.create({
        userId,
        songId,
        body,
    })

    res.json(comment)
})

//edit a comment - update & return an existing comment
router.put('/:userId', requireAuth, validateComment, async (req, res, next) => {
    //query for comment, => series of if statements
        const userId = req.user.id;
        const { body } = req.body;

        const comment = await Comment.findByPk(req.params.userId);


        if (!userId) {
            const err = new Error("User could't be found");
                err.status = 404;
                return next(err);
        }

        if (userId !== comment.userId) {
            const err = new Error("You don't own this comment");
                err.status = 403;
                return next(err);
        }

        comment.body = body;

        await comment.save(); // changes made in lines 86 - 90 saved to be permanent
        res.json(comment); // return
    })

//delete a comment
router.delete('/:userId', requireAuth, async (req, res, next) => {

        const userId = req.user.id;
        const comment = await Comment.findByPk(req.params.userId);

        if (userId !== comment.userId) {
            const err = new Error("You don't own this comment");
                err.status = 403;
                return next(err);
        }

        if (comment) {
            await comment.destroy();
        }

        await comment.save();
        res.json(comment);
    })



module.exports = router;
