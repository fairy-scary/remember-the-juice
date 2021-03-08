var express = require('express');
const router = express.Router();

const db = require('../db/models');
const sequelize = require('sequelize');
const op = sequelize.Op
const { requireAuth } = require('../auth');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

let fruit;

router.post('/theme', asyncHandler(async(req, res) => {
  let {localStorageFruit} = req.body
  fruit = localStorageFruit;
  res.json(fruit)
}))


// User profile page after login. Displays all lists left menu and all tasks.
router.get(`/`, requireAuth, asyncHandler(async (req, res) => {
  const userId = req.session.auth.userId;
  const user = await db.User.findOne({ where: { id: userId } });
  const lists = await db.UserList.findAll({ where: { userId, listName: {[op.not]: 'Trash'}}, order: [['listName', 'ASC']] });
  const trashList = await db.UserList.findOne({where: {userId, listName: 'Trash'}})
  const trashListId = trashList.id;

  // GET ALL TASKS EXCEPT TASKS IN TRASH TO DISPLAY IN MAIN AREA
  const allTasks = await db.Task.findAll({ where: { userId, userListId: {[op.not]: trashListId} } });

  res.render('main', { user, lists, allTasks, userId, trashList, fruit })
}));


module.exports = router;