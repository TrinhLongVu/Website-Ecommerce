const express = require('express')
const router = express.Router();
const payment = require('../controllers/handle.payment.controller')

router
    .route('/verify')
    .post(payment.verify)

router
    .route('/create')
    .post(payment.create)

router 
    .route('/pay')
    .post(payment.payMoney)

router 
    .route('/history/:id')
    .get(payment.getHistory)

router 
    .route('/balance/:id')
    .get(payment.getBalance)

module.exports = router;
