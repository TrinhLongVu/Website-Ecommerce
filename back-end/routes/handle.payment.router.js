const express = require('express')
const router = express.Router();
const payment = require('../controllers/handle.payment.controller')
const middleware = require('../middeware/auth')

router
    .route('/verify')
    .post(payment.verify)

router
    .route('/get/:id')
    .get(payment.history)
    
router 
    .route('/pay/:id')
    .post(payment.payMoney)

module.exports = router;
