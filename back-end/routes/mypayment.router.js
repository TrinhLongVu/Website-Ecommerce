const express = require('express')
const router = express.Router();
const paymentController = require('../controllers/mypayment.controller')
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
    
router 
    .route('/pay/:id')
    .get(paymentController.payMoney)

module.exports = router;