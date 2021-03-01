const express = require('express');
const router = express.Router();
const { logoutUser } = require('../auth');


// Logout 
router.get('/', (req, res) => {
    logoutUser(req, res);
    res.redirect('/logout/user');
});

router.get('/user', (req, res) => {
    res.render('logout');
});

module.exports = router;