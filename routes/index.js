const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const op = sequelize.Op

const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { loginUser } = require('../auth');

const db = require('../db/models');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const bcrypt = require('bcryptjs');


// Login route
router.get('/', csrfProtection, (req, res) => {
  res.render('index', {
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


      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());


        if (passwordMatch) {
          loginUser(req, res, user);
          req.session.save(err => { res.redirect(`/users`) })
          return;
        }
      }
      errors.push('Login failed for the provided username and password. Please try again.');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('index', {
      username,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));


module.exports = router;



