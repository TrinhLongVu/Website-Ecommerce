const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller')
const middleware = require('../middeware/auth')

router
    .route('/')
    .get(middleware.isLoggedAdmin, userController.getAllUsers)

router
    .route('/create/createAll')
    .get(middleware.isLoggedAdmin, userController.createAllUser);

router
    .route('/search/product')
    .get(userController.searchProduct)
    
router
    .route('/information/user')
    .get(userController.getInfo);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
    
module.exports = router;