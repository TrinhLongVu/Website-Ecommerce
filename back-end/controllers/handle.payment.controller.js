const User = require('../models/user.model')
const Product = require('../models/product.model');
const Payment = require('../models/payment.model');
const jwt = require('jsonwebtoken');
const middleware = require('../middeware/auth')
const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
});

exports.payMoney = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.history = async (req, res, next) => { 
    try {
        const paymentid = req.body.paymentid;

        const userId = req.params.id;
        const user = await User.findById(userId);

        const checkBalance = user.Balance.find(payment => payment._id == paymentid)

        if (checkBalance) {
            res.status(200).json({
                status: 'success',
                data: {
                    Payment: checkBalance
                }
            });
        } else {
            res.status(200).json({
                status: 'fail',
                msg: "Can't find anything"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.getAllPayment = async (req, res, next) => { // lấy ra tất cả tài khoản của người dùng, tham số truyền vào là id người dùng

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(200).json({
                status: 'fail',
                msg: "Can't this user"
            });
        }
        const checkBalance = user.Balance

        if (checkBalance) {
            res.status(200).json({
                status: 'success',
                data: {
                    Payment: checkBalance
                }
            });
        } else {
            res.status(200).json({
                status: 'fail',
                msg: "Can't find anything"
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}


exports.payMoney = async (req, res) => { 
    try {
        const token = req.body.token;

        jwt.verify(token, process.env.KEY_TOKEN_PAYMENT, async (err, data) => {
            if (err) {
                console.error('JWT Verification Failed:', err.message);
                return res.status(401).json({
                    status: 'error',
                    msg: 'Unauthorized',
                });
            }
        
            try {
                const user = await User.findById(data.id);
                // handle payment...........................................
                console.log(user);
        
                res.status(200).json({
                    status: 'success'
                });
            } catch (error) {
                console.error('Error fetching user from database:', error.message);
                return res.status(500).json({
                    status: 'error',
                    msg: 'Internal Server Error',
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: error.message
        });
    }
}

exports.verify = async (req, res, next) => {  
    try {
        const id = req.body.id;
        const token = jwt.sign({
            id
        }, process.env.KEY_TOKEN_PAYMENT, {
            expiresIn: '60s'
        });
        
        res.status(200).json({
            status: 'success',
            token: token
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: error.message
        });
    }
}
