const express = require('express');
const router = express.Router();
const db = require('../db/models');
const sequelize = require('sequelize');
const op = sequelize.Op
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


// Creates and saves a new list
router.post('/', asyncHandler(async (req, res) => {
  // if there's no req.session.auth, then userId is hard coded to be demo's userId. 
  //Else, userId is received from session
  if (!req.session.auth) {
    const user = await db.User.findOne({ where: { username: 'demo' } });
    const userId = user.id;
    const { listName } = req.body

    // PREVENTS CREATION OF EMPTY LIST NAME
    if(listName){
      const newList = await db.UserList.build({ listName, userId });
      await newList.save()
      res.redirect('/demo');
    } else {
      res.redirect('/demo');
    }
    
  } else {
    const userId = req.session.auth.userId;
    const { listName } = req.body;

    // PREVENTS CREATION OF EMPTY LIST NAME
    if(listName){
      const newList = await db.UserList.build({ listName, userId });
      await newList.save()
      res.redirect('/users')
    } else {
      res.redirect('/users')
    }
  }
}));

// Delete a list
router.post('/delete', asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    const user = await db.User.findOne({ where: { username: 'demo' } });
    const userId = user.id;
    const { listName } = req.body
    await db.Task.destroy({ where: { userId, userListId: listName } });
    await db.UserList.destroy({ where: { id: listName, userId } });
    res.redirect('/demo');
  } else {
    const userId = req.session.auth.userId;
    const { listName } = req.body;
    await db.Task.destroy({ where: { userId, userListId: listName } });
    await db.UserList.destroy({ where: { id: listName, userId } });
    res.redirect('/users');
  }
}));

// When a list is clicked on in left side menu, display the tasks in that list
router.get(`/:userListId(\\d+)`, asyncHandler(async (req, res) => {
  if (!req.session.auth) {
    const user = await db.User.findOne({ where: { username: 'demo' } });
    const userId = user.id;
    const userListId = req.params.userListId;

    const lists = await db.UserList.findAll({ where: { userId, listName: {[op.not]: 'Trash'}} });
    const trashList = await db.UserList.findOne({where: {userId, listName: 'Trash'}});

    // GET ALL TASKS IN SPECIFIC LIST
    const allTasks = await db.Task.findAll({ where: { userId, userListId } });

    // GET CURRENT LIST THAT IS CLICKED ON
    const currentListName = await db.UserList.findOne({ where: { id: userListId } });
    
    res.render('list', { lists, allTasks, userId, user, trashList, currentListName });
  } else {
    const userId = req.session.auth.userId;
    const user = await db.User.findOne({ where: { userId } });
    const userListId = req.params.userListId;

    const lists = await db.UserList.findAll({ where: { userId, listName: {[op.not]: 'Trash'} } });
    const trashList = await db.UserList.findOne({where: {userId, listName: 'Trash'}});

    // GET ALL TASKS IN SPECIFIC LIST
    const allTasks = await db.Task.findAll({ where: { userId, userListId } });

    // GET CURRENT LIST THAT IS CLICKED ON
    const currentListName = await db.UserList.findOne({ where: { id: userListId } });

    res.render('list', { lists, allTasks, user, trashList, currentListName });
  }
}));


module.exports = router;
