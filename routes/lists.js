const express = require('express');
const router = express.Router();
const sequelize = require('sequelize')
const op = sequelize.Op

const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');

const db = require('../db/models');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const bcrypt = require('bcryptjs');


router.post('/', asyncHandler(async(req, res) => {
    console.log(req.session)
    const userId = parseInt(req.session.auth.userId);
    const { listName } = req.body
    const newList = await db.UserList.build({ listName, userId });
    await newList.save()
  
    res.redirect('/users/'+userId)
    
  }));

module.exports = router;
  