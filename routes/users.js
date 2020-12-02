var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const bcrypt = require('bcryptjs');

// Login route
router.get('/', csrfProtection, (req, res) => {
  res.render('index', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
});

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];


// After 'login' button is clicked
router.post('/', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { username } });
      console.log(user)

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        console.log(passwordMatch)

        if (passwordMatch) {
          return res.redirect('/profile');
        }
      }
      errors.push('Login failed for the provided username and password. Please try again.');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('index', {
      title: 'Login',
      username,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));





/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
module.exports = router;