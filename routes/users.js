var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { loginUser, requireAuth } = require('../auth');

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
    .withMessage('Please provide a value for Username.')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters long.')
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Username is already in use by another account. Please try again.');
          }
        })
    }),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address.')
    .isLength({ max: 320 })
    .withMessage('Email Address must not be more than 320 characters long')
    .isEmail()
    .withMessage('Email Address is not a valid email. Please try again.')
    .custom((value) => {
      return db.User.findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account. Please try again.');
          }
        })
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password.')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long.'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password.')
    .isLength({ max: 50 })
    .withMessage('Confirm Password must not be more than 50 characters long.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password. Please try again');
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
      // Create Personal list for each new user
      await db.UserList.create({ listName: 'Personal', userId: user.id });
      loginUser(req, res, user);
      res.redirect(`/users/:${user.id}`);
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


// User profile page
router.get(`/:id`, requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await db.User.findOne({ where: { id: userId } });

  res.render('main', { user, })
}));


// Logout 
router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
});



/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
module.exports = router;