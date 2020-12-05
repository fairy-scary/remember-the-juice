const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const db = require('../db/models');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


// Creates and saves a new list
router.post('/', asyncHandler(async (req, res) => {
  // if there's no req.session.auth (this would happen if the user hasn't logged in, thus would be in demo mode), then userId is hard coded to be demo's userId. 
  //Else, userId is received from session
  if (!req.session.auth) {
    const userId = 3;
    const { listName } = req.body
    const newList = await db.UserList.build({ listName, userId });
    await newList.save()
    res.redirect('/demo');
  } else {
    const userId = req.session.auth.userId;

    const { listName } = req.body
    const newList = await db.UserList.build({ listName, userId });
    await newList.save()

    res.redirect('/users')
  }

}));

// Delete a list
router.post('/delete', asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    const userId = 3;
    const { listName } = req.body
    await db.UserList.destroy({ where: { id: listName, userId } });
    res.redirect('/demo');
  } else {
    const userId = req.session.auth.userId;
    const { listName } = req.body
    await db.UserList.destroy({ where: { id: listName, userId } });
    res.redirect('/users');
  }
}));

// When a list is clicked on in left side menu, display the tasks in that list
router.get(`/:userListId(\\d+)`, asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    const userId = 3;
    const userListId = req.params.userListId;

    const lists = await db.UserList.findAll({ where: { userId } });

    console.log(req.session)
    const allTasks = await db.Task.findAll({ where: { userId, userListId } })
    res.render('list', { lists, allTasks });
  } else {
    const userId = req.session.auth.userId;
    const userListId = req.params.userListId;

    const lists = await db.UserList.findAll({ where: { userId } });

    const allTasks = await db.Task.findAll({ where: { userId, userListId } })
    res.render('list', { lists, allTasks });
  }
}));


module.exports = router;
