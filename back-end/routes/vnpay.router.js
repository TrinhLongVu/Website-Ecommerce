const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/vnpay.controller')
const middleware = require('../middeware/auth')

router.get('/', paymentController.createPayment);
router.post('/create',middleware.isLoggedUser, paymentController.createPayment);
router.get('/vnpay_return', paymentController.returnPayment);

module.exports = router;