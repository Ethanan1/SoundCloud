const express = require("express");
const { User, Song, Album, Playlist, Comment } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth")
const { check } = require("express-validator")
const { handleValidationErrors } = require("../../utils/validation")
const app = require ('../../app')

// const validateArtists = [
//     check('title')
//       .exists({ checkFalsy: true })
//       .withMessage('Song title is required'),
//     check('description')
//       .exists({ checkFalsy: true })
//       .withMessage('Description is required'),
//       check('imageUrl')
//       .exists({ checkFalsy: true })
//       .withMessage('Image Url is required'),
//     handleValidationErrors
//   ];

router.get('/:artistId', async (req, res) => {
    
})




module.exports = router
