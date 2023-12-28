const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryController')

router
    .route('/')
    .get(category.getCategory)
    .post(category.addCategory)

router
    .route('/page')
    .get(category.getPagination)

module.exports = router;