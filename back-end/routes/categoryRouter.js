const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryController')

router
    .route('/')
    .get((req, res) => {

    })
    .post(category.addCategory)

module.exports = router;