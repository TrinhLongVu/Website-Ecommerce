const express = require('express');
const router = express.Router();

const articleController = require('../controllers/productController')

router
    .route('/')
    .get(articleController.getAllProduct)
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
    .post(articleController.addComment)

router
    .route('/search/:searchString')  // Note: if searchString have multiple words, convert to "word1+word2+..." .concatnate words with a "+" sign, must not have "space"(" ") in searchString
    .get(articleController.SearchProduct)

module.exports = router;