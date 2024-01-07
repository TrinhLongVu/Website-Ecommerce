const express = require('express')
const router = express.Router();
const statisticC = require('../controllers/statistic.controller')
const middleware = require('../middeware/auth')

router
    .route('/revenue')
    .get(statisticC.getTotalRevenue)
    
router
    .route('/transaction')
    .get(statisticC.transaction)
module.exports = router;