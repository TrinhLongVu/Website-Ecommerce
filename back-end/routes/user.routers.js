const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller')
const middleware = require('../middeware/auth')

router
    .route('/')
    .get(middleware.isLoggedAdmin, userController.getAllUsers)

router
    .route('/create/createAll')
    .post(middleware.isLoggedAdmin, userController.createAllUser);

router
    .route('/create/newUser')
    .post(middleware.isLoggedAdmin,userController.createUser);    

router
    .route('/search/product')
    .get(userController.searchProduct)
    
router
    .route('/information/user')
    .get(userController.getInfo);

router
    .route('/:id')
    .get(middleware.isLoggedAdmin,userController.getUser)
    .patch(middleware.isLogged, userController.updateUser)
    .delete(middleware.isLoggedAdmin,userController.deleteUser);
    
module.exports = router;