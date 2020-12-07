const express = require('express');
const router = express.Router();
const { logoutUser } = require('../auth');


// Logout 
router.get('/', (req, res) => {
    logoutUser(req, res);
    res.redirect('/');
});

module.exports = router;