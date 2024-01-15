const express = require('express')
const router = express.Router();
const userController = require('../controllers/cart.controller')
const middleware = require('../middeware/auth')

router
    .route('/get/:id')
    .get(middleware.isLoggedUser,userController.getCart);

router
    .route('/add/:id')
    .post(middleware.isLoggedUser,userController.addCart);

router
    .route('/minus/:id')
    .post(middleware.isLoggedUser,userController.minusCart);

router
    .route('/delete/:id')
    .post(userController.deleteCart);

module.exports = router;