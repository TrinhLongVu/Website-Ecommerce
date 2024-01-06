const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller')

router
    .route('/')
    .get(category.getCategory)
    .post(category.addCategory)

router
    .route('/page')
    .get(category.getPagination)

router
    .route('/hidden')
    .post(category.hidden)

module.exports = router;