const express = require('express');
const router = express.Router();
const db = require('../db/models');
const sequelize = require('sequelize');
const op = sequelize.Op
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// Create a new task. Saves to Personal list, redirects to /users unless demo
router.post('/', asyncHandler(async (req, res) => {
    // if there's no req.session.auth (this would happen if the user hasn't logged in, thus would be in demo mode), then userId is hard coded to be demo's userId. 
    //Else, userId is received from session
    const { listName } = req.body;
    const userListId = listName;
    if (!req.session.auth) {
        const userId = 3;
        // const id = await db.UserList.findOne({
        //     where: {
        //         [op.and]: [
        //             { userId: userId },
        //             { userListId: 'Personal' },
        //         ],
        //     },
        // });
        // const userListId = id.id
        const { taskContent } = req.body
        const task = await db.Task.build({ taskContent, userId, userListId });
        await task.save()

        res.redirect(`/demo`);
    } else {
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

        res.redirect(`/users`)
    }
}));

module.exports = router;