const express = require('express');
const router = express.Router();
const db = require('../db/models');
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get(`/`, asyncHandler(async (req, res) => {
    const user = await db.User.findOne({ where: { username: 'demo' } });
    const userId = user.id;

    const lists = await db.UserList.findAll({ where: { userId: userId } });
    const allTasks = await db.Task.findAll({ where: { userId: userId } });
    res.render('main', { user, lists, allTasks, userId });
}));

module.exports = router;