const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const middleware = require('../middeware/auth')

router
    .route('/')
    .get(middleware.isLoggedAdmin, userController.getAllUsers)

router
    .route('/create/createAll')
    .get(middleware.isLoggedAdmin, userController.createAllUser);

router
    .route('/cart/add/:id')
    .post(userController.addCart);

router
    .route('/cart/minus/:id')
    .post(userController.minusCart);

router
    .route('/cart/delete/:id')
    .post(userController.deleteCart);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;