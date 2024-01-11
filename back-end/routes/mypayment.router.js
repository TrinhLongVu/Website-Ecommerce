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
    .post(paymentController.payMoney)

router 
    .route('/create/verify')
    .get(paymentController.Verify)

router 
    .route('/pay/test/a')
    .post(paymentController.paytest)

module.exports = router;
