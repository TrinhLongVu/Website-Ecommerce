const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller')
const middleware = require('../middeware/auth')

router
    .route('/')
    .get(productController.getAllProduct)
    .post(productController.createProduct)

router
    .route('/create/createAll')
    .post(productController.createAllProduct)

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(middleware.isLoggedAdmin, productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;