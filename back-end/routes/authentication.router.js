const express = require('express')
const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/authentication.controller')

router
    .route('/account/fail')
    .get(userController.fail);

router
    .route('/account/signup')
    .post(userController.signup);

router
    .route('/account/login/auth/google')
    .get(passport.authenticate('google', {
        scope: ['profile']
    }))

router
    .route('/account/gg/callback')
    .get(passport.authenticate('google', {
        failureRedirect: '/api/v1/user/account/fail'
    }), userController.success)

router
    .route('/account/login')
    .post(passport.authenticate('local', {
        failureRedirect: '/api/v1/user/account/fail'
    }), userController.successLocal)
  
module.exports = router;