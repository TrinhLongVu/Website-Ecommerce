const User = require('../models/user.model')
const Product = require('../models/product.model');
const Payment = require('../models/payment.model');
const Transaction = require('../models/transaction.model');
const middleware = require('../middeware/auth')
const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
});

exports.createPaymentAccount = async (req, res, next) => { // tạo 1 tài khoản trong user.Balance, tham số truyền vào là số tiền và id của người dùng
    try {
        const money = req.body.money;
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                msg: 'User not found'
            });
        }

        if (!user.AccountPayment) {
            user.AccountPayment = ''
        }
        else {
            return res.status(404).json({
                status: 'fail',
                msg: 'You already have payment account'
            });
        }

        const balance = {
            balance: money
        }
        const newPayment = await Payment.create(balance);
        user.AccountPayment = newPayment;
        await user.save();
        res.status(200).json({
            status: 'success',
            data: {
                Payment: user
            }
        });
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
        const user = await User.findById(userId)
            .populate({
                path: 'AccountPayment',
                select: 'balance'
            })

        if (user.AccountPayment) {
            res.status(200).json({
                status: 'success',
                data: {
                    UserBalance: user.AccountPayment.balance
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


exports.payMoney = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
            .populate({
                path: 'AccountPayment',
                select: 'balance'
            })
        if (!user.AccountPayment) {
            user.AccountPayment = '';
        }

        console.log(user.AccountPayment.balance)
        if (user.Cart.length == 0) {
            return res.status(200).json({
                status: 'fail',
                msg: "You dont have any Cart to pay"
            });
        }
        const { totalPrice } = req.body
        const price = parseFloat(totalPrice)
        if (!user) {
            return res.status(200).json({
                status: 'fail',
                msg: "Can't this user"
            });
        }

        if (user.AccountPayment.balance < price) {
            return res.status(200).json({
                status: 'fail',
                msg: "You do not have enough money to pay this payment"
            });
        }

        const adminId = process.env.ADMINID;
        const admin = await User.findById(adminId)
            .populate({
                path: 'AccountPayment',
                select: 'balance'
            })
        // admin.AccountPayment.balance += price;
        // admin.TotalMoneyTransaction += price;
        // user.TotalMoneyTransaction += price;
        // user.AccountPayment.balance -= price;
        if (!user.Transaction) {
            user.Transaction = [];
        }

        if (!admin.Transaction) {
            admin.Transaction = [];
        }

        const transaction = {
            idUser: user.id,
            cart_id: user.Cart.map(cart => cart.product_id),
            time: new Date()
        }
        const idTransaction = await Transaction.create(transaction);
        console.log(idTransaction)
        user.Transaction.push(idTransaction)
        admin.Transaction.push(idTransaction)

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

exports.Verify = async (req, res, next) => {
    try {
        // req.user.token;

        const id = "req.user._id"
        const url = 'http://localhost:3001/api/v1/payment/verify';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            req.user.token = result.token;
        } catch (error) {
            console.error('Error:', error.message);
        }

        req.
            res.status(200).json({
                status: 'success'
            })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: error.message
        });
    }
}