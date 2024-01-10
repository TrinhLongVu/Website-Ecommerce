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


exports.payMoney = async (req, res, next) => {  // thanh toán tiền, tham số nhận vào là id người dùng, id của tài khoản thanh toán, tổng số tiền của Cart
    // sau khi thanh toán, xóa hết user.Cart và lưu lại lịch sử giao dịch trong user.Transaction
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(user.Cart.length == 0){
            return res.status(200).json({
                status: 'fail',
                msg: "You dont have any Cart to pay"
            });
        }
        const { paymentid, totalPrice } = req.body

        const price = parseFloat(totalPrice)
        if (!user) {
            return res.status(200).json({
                status: 'fail',
                msg: "Can't this user"
            });
        }

        const balanceAccount = user.Balance.find(balance => balance.id == paymentid)
        if (!balanceAccount) {
            return res.status(200).json({
                status: 'fail',
                msg: "Can't find this account in your Balance"
            });
        }
        if (balanceAccount.balance < price) {
            return res.status(200).json({
                status: 'fail',
                msg: "You do not have enough money to pay this payment"
            });
        }

        const adminId = process.env.ADMINID;
        const admin = await User.findById(adminId)
        


        admin.Balance[0].balance += price;
        admin.TotalMoneyTransaction += price;
        user.TotalMoneyTransaction += price;

        balanceAccount.balance -= price;

        if (!user.Transaction) {
            user.Transaction = [];
        }

        if (!admin.Transaction) {
            admin.Transaction = [];
        }

        admin.Transaction.push({
            user_id: user.id,
            cart_id: user.Cart.map(cart => cart.product_id),
            time: new Date()
        });


        user.Transaction.push({
            user_id: user.id,
            cart_id: user.Cart.map(cart => cart.product_id),
            time: new Date()
        });

        user.Cart.splice(0);

        await user.save();
        await admin.save();

        res.status(400).json({
            status: 'success',
            data: user
        })

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
