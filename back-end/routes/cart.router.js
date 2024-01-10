const express = require('express')
const router = express.Router();
const userController = require('../controllers/cart.controller')
const middleware = require('../middeware/auth')

router
    .route('/get/:id')
    .get(userController.getCart);

router
    .route('/add/:id')
    // .post(middleware.isLoggedUser,userController.addCart);
    .post(userController.addCart);

router
    .route('/minus/:id')
    .post(userController.minusCart);

router
    .route('/delete/:id')
    .post(userController.deleteCart);

module.exports = router;