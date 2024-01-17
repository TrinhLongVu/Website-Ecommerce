const express = require('express')
const router = express.Router();
const statisticC = require('../controllers/statistic.controller')
const middleware = require('../middeware/auth')

router
    .route('/revenue')
    .get(middleware.isLoggedAdmin,statisticC.getTotalRevenue)
    
router
    .route('/transaction')
    .get(middleware.isLoggedAdmin,statisticC.transaction)
module.exports = router;