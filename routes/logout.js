const express = require('express');
const router = express.Router();
const { logoutUser } = require('../auth');


// Logout 
router.post('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/');
});

module.exports = router;