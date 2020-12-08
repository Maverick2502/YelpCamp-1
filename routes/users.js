const express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    catchAsync = require('../utils/catchAsync'),
    User = require('../models/user'),
    users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: true }), 
        users.login);

router.get('/logout', users.logout)

module.exports = router;