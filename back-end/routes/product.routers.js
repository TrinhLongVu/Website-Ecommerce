const express = require('express');
const router = express.Router();

const articleController = require('../controllers/product.controller')
const middleware = require('../middeware/auth')

router
    .route('/')
    .get(articleController.getAllProduct)
    .post(articleController.createProduct)

router
    .route('/create/createAll')
    .post(articleController.createAllProduct)

router
    .route('/:id')
    .get(articleController.getProduct)
    .patch(articleController.updateProduct)
    .delete(articleController.deleteProduct)

module.exports = router;