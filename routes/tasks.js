const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { requireAuth } = require('../auth');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// Create a new task
router.post('/create', requireAuth, asyncHandler(async (req, res) => {
  
    //     // const id = await db.UserList.findOne({
    //     //     where: {
    //     //         [op.and]: [
    //     //             { userId: userId },
    //     //             { listName: 'Personal' },
    //     //         ],
    //     //     },
    //     // });
    //     // const userListId = id.id

    const { taskContent, userListId } = req.body;
    const userId = req.session.auth.userId;

    const task = await db.Task.build({ taskContent, userId, userListId });
    await task.save();
    res.json(task)
 

}));

router.delete('/delete', requireAuth, asyncHandler(async (req, res) => {
  
    const userId = req.session.auth.userId;
    const { taskId } = req.body;
    let task = await db.Task.findOne({ where: { userId, id: taskId} });
    await db.Task.destroy({ where: { userId, id: taskId} });
    res.json(task)

}));



module.exports = router;