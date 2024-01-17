const express = require('express')
const router = express.Router();
const paymentController = require('../controllers/mypayment.controller')
const middleware = require('../middeware/auth')

router
    .route('/get/:id')
    .get(middleware.isLoggedUser,paymentController.getAllPayment)

router
    .route('/transaction/:id')
    .get(paymentController.getTransaction)
    
router 
    .route('/pay/product')
    .post(middleware.isLoggedUser,paymentController.payMoney)

router 
    .route('/create/verify')
    .get(middleware.isLoggedUser,paymentController.Verify)

module.exports = router;
