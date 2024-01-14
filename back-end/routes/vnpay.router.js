const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/vnpay.controller')
const middleware = require('../middeware/auth')

router.get('/', (req, res) => {
    res.json({
        status: 'success' 
    })
})
router.post('/create',middleware.isLoggedUser, paymentController.createPayment);
router.get('/vnpay_return',middleware.isLoggedUser, paymentController.returnPayment);

module.exports = router;