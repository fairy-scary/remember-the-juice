const express = require('express');
const router = express.Router();
const db = require('../db/models');
const sequelize = require('sequelize');
const op = sequelize.Op;
const { requireAuth } = require('../auth');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


// Creates and saves a new list
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId;
    const { listName } = req.body;

    // PREVENTS CREATION OF EMPTY LIST NAME
    if(listName){
      const newList = await db.UserList.build({ listName, userId });
      await newList.save()
      res.redirect('/profile')
    } else {
      res.redirect('/profile')
    }
  }));
  

// Delete a list

router.delete('/delete', requireAuth, asyncHandler(async (req, res) => {
    
    const userId = req.session.auth.userId;
    const { userListId } = req.body;

    let list = await db.UserList.findOne({ where: { id: userListId, userId } });
    let tasks = await db.Task.findAll({ where: { userListId, userId } });
    await db.Task.destroy({ where: { userId, userListId } });
    await db.UserList.destroy({ where: { id: userListId, userId } });
    res.json({list, tasks})
}));


// When a list is clicked on in left side menu, display the tasks in that list
router.get(`/:userListId(\\d+)`, requireAuth, asyncHandler(async (req, res) => {
  
  const userId = req.session.auth.userId;
  const user = await db.User.findOne({ where: { id: userId } });
  const userListId = req.params.userListId;

  const lists = await db.UserList.findAll({ where: { userId, listName: {[op.not]: 'Trash'} }, order: [['listName', 'ASC']] });
  const trashList = await db.UserList.findOne({where: {userId, listName: 'Trash'}});

  // GET ALL TASKS IN SPECIFIC LIST
  const allTasks = await db.Task.findAll({ where: { userId, userListId } });

  // GET CURRENT LIST THAT IS CLICKED ON
  let currentListName = await db.UserList.findOne({ where: { id: userListId } });
  if(currentListName.listName === 'Trash'){
    let trash = currentListName;
    let allTrashTasks = allTasks;
    res.render('list', { lists, allTrashTasks, allTasks, user, trashList, trash });
  } else {
    res.render('list', { lists, allTasks, user, trashList, currentListName });
  }

}));


module.exports = router;
