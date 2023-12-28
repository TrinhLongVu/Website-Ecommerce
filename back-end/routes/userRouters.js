const express = require('express')

const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/userController')
// const abc = require('../controllers/authenticationController')

router
    .route('/')
    .get(userController.getAllUsers)

router
    .route('/create/createAll')
    .get(userController.createAllUser);

router
    .route('/cart/add/:id')
    .post(userController.addCart);

router
    .route('/cart/minus/:id')
    .post(userController.minusCart);

router
    .route('/cart/delete/:id')
    .post(userController.minusCart);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router
    .route('/pages/:id') // :id of writer
    .get(userController.getWriter)
    .patch(userController.Follow_Or_UnFollow_Writer) // To Follow or Unfollow a writer (:id is writer's id, User's id is in response body) 


module.exports = router;