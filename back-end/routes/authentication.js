const express = require('express')

const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/authenticationController')

router
    .route('/account/success')
    .get(userController.Authentication);

router
    .route('/account/Login/auth/google')
    .get(passport.authenticate('google', {
        scope: ['profile']
    }))
    
router
    .route('/account/gg/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/api/v1/user/account/success',
        failureRedirect: '/api/v1/user/account/success'
    }))

router
    .route('/account/Login')
    .post(passport.authenticate('local', {
        successRedirect: '/api/v1/user/account/success',
        failureRedirect: '/api/v1/user/account/success'
    }))

module.exports = router;