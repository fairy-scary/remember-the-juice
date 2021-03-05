const express = require('express');
const router = express.Router();
const db = require('../db/models');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// Create a new task
router.post('/', asyncHandler(async (req, res) => {
  
    const { listName } = req.body;
    const userListId = listName;
    const userId = req.session.auth.userId;
        // const id = await db.UserList.findOne({
        //     where: {
        //         [op.and]: [
        //             { userId: userId },
        //             { listName: 'Personal' },
        //         ],
        //     },
        // });
        // const userListId = id.id

    const { taskContent } = req.body
    const task = await db.Task.build({ taskContent, userId, userListId });
    await task.save()

    res.redirect(`/profile`)

}));

router.delete('/delete', asyncHandler(async (req, res) => {
  
    const userId = req.session.auth.userId;
    const { taskId } = req.body;
    await db.Task.destroy({ where: { userId, id: taskId} });
    res.json(taskId)

}));



module.exports = router;