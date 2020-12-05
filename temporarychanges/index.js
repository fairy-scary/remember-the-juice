var express = require('express');
var router = express.Router();

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

router.post('/demo', asyncHandler(async (req, res) => {
  const user = await db.User.findOne({ where: { username: 'demo' } })
  loginUser(req, res, user);
  return res.redirect('/users/demo');
}));

// router.get('/users/demo', asyncHandler(async (req, res) => {
//   res.render('main')
// }))


// Tasks for demo user
router.post('/users/demo', asyncHandler(async (req, res) => {
  const user = await db.User.findOne({ where: { username: 'demo4' } });
  const userId = user.id

  const id = await db.UserList.findOne({ where: { userId: userId } })
  const userListId = id.id

  const { taskContent } = req.body
  const task = await db.Task.build({ taskContent, userId, userListId });
  await task.save()
  res.redirect('/users/demo')
}));

router.get('/users/demo', asyncHandler(async (req, res) => {
  const allTasks = await db.Task.findAll({ where: { userId: 22 } })

  // console.log('*************' + users[0].username)
  res.render('main', { allTasks });

}));

// testing for ajax update on summary

const tasksummary= {
  tasksincompleted: 0,
  taskscompleted: 0,
  taskstotal: 0
}

router.patch("/users/demo/taskadded", (req, res) => {
  console.log("summary +1 task");
  tasksummary.tasksincompleted += 1;
  tasksummary.taskstotal += 1;
  res.json({ tasksummary: tasksummary });
});

router.patch("/users/demo/taskcompleted", (req, res) => {
  console.log("summary +1 completed");
  tasksummary.tasksincompleted -= 1;
  tasksummary.taskscompleted += 1;
  res.json({ tasksummary: tasksummary });
});




module.exports = router;



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'a/A Express Skeleton Home' });
// });
