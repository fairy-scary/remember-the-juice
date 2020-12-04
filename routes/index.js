const express = require('express');
const router = express.Router();
const sequelize = require('sequelize')
const op = sequelize.Op

const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');

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


      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());


        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect(`/users/${user.id}`);
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

router.post('/:id', asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(id);
  loginUser(req, res, user);
  return res.redirect('/users/:id');
}));

// router.get('/users/:id', asyncHandler(async (req, res) => {
//   res.render('main')
// }))

// Tasks for :id user
router.post('/users/:id', asyncHandler(async (req, res) => {
 
  const userId = parseInt(req.params.id, 10);
 
  const user = await db.User.findByPk(userId);

  const id = await db.UserList.findOne({ 
    where: { 
      [op.and]: [ 
        { userId: userId },
        { listName: 'Personal' },
      ],  
    }, 
  });
  const userListId = id.id

  const { taskContent } = req.body
  const task = await db.Task.build({ taskContent, userId, userListId });
  await task.save()

  res.redirect(`/users/${userId}`)
}));



router.get('/users/:id', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await db.User.findByPk(userId);
 
  const allTasks = await db.Task.findAll({ where: { userId: userId } })
  
  const lists = await db.UserList.findAll({ where: { userId: userId } })

  // console.log('*************' + users[0].username)
  res.render('main', { allTasks, lists, user, userId });

}));



module.exports = router;



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'a/A Express Skeleton Home' });
// });

