// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { nextTick } = require('async');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// Sign up
router.post('/', validateSignup, async (req, res, next) => {
      const { firstName, lastName, email, password, username } = req.body;

      try {
      const user = await User.signup({ firstName, lastName, email, username, password });
      const token = await setTokenCookie(res, user);

      user.dataValues.token = token

      return res.json(user)

    } catch(e) {
      e.status = 403;
      e.message = "User already exists";
      return next(e);
    }
    });

  // Get current user
router.get(
  '/', (req, res) => {
    res.send(user)
  }
)

module.exports = router;
