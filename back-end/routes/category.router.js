const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller')
const middleware = require('../middeware/auth')

router
    .route('/')
    .get(category.getCategory)

router
    .route('/admin')
    .get(middleware.isLoggedAdmin, category.getAdminCategory)
    .post(middleware.isLoggedAdmin, category.addCategory)


router
    .route('/page')
    .get(category.getPagination)

router
    .route('/hidden')
    .post(category.hidden)

router
    .route('/update')
    .patch(category.update)

module.exports = router;