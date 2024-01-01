const express = require('express')
const router = express.Router();
const paymentController = require('../controllers/payment1.controller')
const middleware = require('../middeware/auth')


router
    .route('/:id')
    .get(paymentController.getAllPayment)

router
    .route('/create/:id') //create account for router
    .post(paymentController.createPaymentAccount)

router
    .route('/get/:id')
    .get(paymentController.getAllPayment)

module.exports = router;
