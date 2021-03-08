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
    const allTasksInCurrentList = await db.Task.findAll({ where: { userId, userListId }});
    res.json({task, allTasksInCurrentList})
}));

// PERMANENTLY DELETE A TASK -- USED ON TRASH PAGE
router.delete('/delete', requireAuth, asyncHandler(async (req, res) => {
  
    const userId = req.session.auth.userId;
    const { taskId, userListId } = req.body;
    let task = await db.Task.findOne({ where: { userId, id: taskId} });
    await db.Task.destroy({ where: { userId, id: taskId} });
    
    let allTasksInCurrentList;
    if(userListId){
        allTasksInCurrentList = await db.Task.findAll({ where: { userId, userListId }});
    }
    

    res.json({task, allTasksInCurrentList})

}));


router.post('/trash', requireAuth, asyncHandler(async (req, res) => {
  
    const userId = req.session.auth.userId;
    const { taskId, userListId } = req.body;
    let task = await db.Task.findOne({ where: { userId, id: taskId} });
    let trashList = await db.UserList.findOne({where: {userId, listName: 'Trash'}});

    const saveTask = await db.Task.build({ taskContent: task.taskContent, userId, userListId: trashList.id });
    await saveTask.save();
    await db.Task.destroy({ where: { userId, id: taskId} });
    
    // WILL HAVE USERLISTID IF USER IS ON PAGE VIEWING A SPECIFIC LIST. 
    let allTasksInCurrentList;
    if(userListId){
        allTasksInCurrentList = await db.Task.findAll({ where: { userId, userListId }});
    }
    
    res.json({task, allTasksInCurrentList})

}));



module.exports = router;