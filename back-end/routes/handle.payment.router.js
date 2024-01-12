const express = require('express')
const router = express.Router();
const payment = require('../controllers/handle.payment.controller')

router
    .route('/verify')
    .post(payment.verify)

router
    .route('/get/:id')
    .get(payment.history)
    
router 
    .route('/pay')
    .post(payment.payMoney)

module.exports = router;
