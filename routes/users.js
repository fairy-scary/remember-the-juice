var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const bcrypt = require('bcryptjs');



// Signup
router.get('/signup', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('signup', {
    title: 'Signup',
    user,
    csrfToken: req.csrfToken(),
  });
});

const userValidators = [
  // Define the user validators.
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 320 })
    .withMessage('Email Address must not be more than 320 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      }
      return true;
    }),
];



// After clicking signup button 
router.post('/signup', csrfProtection, userValidators,
  asyncHandler(async (req, res) => {
    const { username, email, password, } = req.body;


    const user = db.User.build({
      username,
      email,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('signup', {
        title: 'Signup',
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));





/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
module.exports = router;