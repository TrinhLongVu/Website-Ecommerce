const express = require('express');
const router = express.Router();

const articleController = require('../controllers/productController')
const middleware = require('../middeware/auth')

router
    .route('/')
    .get(middleware.isLoggedUser, articleController.getAllProduct)
    .post(articleController.createProduct)

router
    .route('/create/createAll')
    .post(articleController.createAllProduct)

router
    .route('/category/:name')
    .get(articleController.getCategory)

router
    .route('/top/:name')
    .get(articleController.getTops)
    
router
    .route('/page/pagination')
    .get(articleController.getPagination)

router
    .route('/:id')
    .get(articleController.getProduct)
    .patch(articleController.updateProduct)
    .delete(articleController.deleteProduct)

router
    .route('/search/:searchString')
    .get(articleController.SearchProduct)

module.exports = router;