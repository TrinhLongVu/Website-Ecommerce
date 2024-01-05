const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller')

router.get('/', (req, res) => {
    res.json({
        status: 'success' 
    })
})
router.post('/create', paymentController.createPayment);
router.get('/vnpay_return', paymentController.returnPayment);
router.post('/buy/:id', paymentController.payProduct);

module.exports = router;