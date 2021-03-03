// const express = require('express');
// const router = express.Router();
// const sequelize = require('sequelize');
// const op = sequelize.Op
// const db = require('../db/models');
// const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// router.get(`/`, asyncHandler(async (req, res) => {
//     const user = await db.User.findOne({ where: { username: 'demo' } });
//     const userId = user.id;

//     const lists = await db.UserList.findAll({ where: { userId, listName: {[op.not]: 'Trash'}} });
//     const trashList = await db.UserList.findOne({where: {userId, listName: 'Trash'}});
//     const trashListId = trashList.id;

//     // GET ALL TASKS EXCEPT TASKS IN TRASH
//     const allTasks = await db.Task.findAll({ where: { userId, userListId: {[op.not]: trashListId} } });

//     res.render('main', { user, lists, allTasks, userId, trashList });
// }));

// module.exports = router;