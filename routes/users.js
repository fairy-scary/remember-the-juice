var express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const sequelize = require('sequelize');
const op = sequelize.Op
const { loginUser, requireAuth } = require('../auth');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const bcrypt = require('bcryptjs');



// Signup
router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const user = await db.User.build();
  res.render('signup', {
    user,
    csrfToken: req.csrfToken(),
  });
}));

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
      // Create Personal list and Trash list for each new user
      await db.UserList.create({ listName: 'Personal', userId: user.id });
      await db.UserList.create({ listName: 'Trash', userId: user.id });
      loginUser(req, res, user);
      res.redirect(`/profile`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('signup', {
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }


  }));


// User profile page after login. Displays all lists and all tasks.
// router.get(`/`, requireAuth, asyncHandler(async (req, res) => {
//   const userId = req.session.auth.userId;
//   const user = await db.User.findOne({ where: { id: userId } });
//   const lists = await db.UserList.findAll({ where: { userId, listName: {[op.not]: 'Trash'}} });
//   const trashList = await db.UserList.findOne({where: {userId, listName: 'Trash'}})
//   const trashListId = trashList.id;

//   // GET ALL TASKS EXCEPT TASKS IN TRASH
//   const allTasks = await db.Task.findAll({ where: { userId, userListId: userListId, userListId: {[op.not]: trashListId} } });

//   res.render('main', { user, lists, allTasks, userId, trashList })
// }));



module.exports = router;