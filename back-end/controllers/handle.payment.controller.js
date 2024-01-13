const User = require('../models/user.model')
const Product = require('../models/product.model');
const Payment = require('../models/payment.model');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/transaction.model');
const middleware = require('../middeware/auth')
const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
});

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
        const {
            token,
            phone,
            address
        } = req.body;

        jwt.verify(token, process.env.KEY_TOKEN_PAYMENT, async (err, data) => {
            if (err) {
                console.error('JWT Verification Failed:', err.message);
                return res.status(401).json({
                    status: 'error',
                    msg: 'Unauthorized',
                });
            }

            try {
                const user = await User.findById(data.id)
                    .populate({
                        path: 'AccountPayment',
                        select: 'balance'
                    })
                if (!user.AccountPayment) {
                    user.AccountPayment = '';
                }

                if (user.Cart.length == 0) {
                    return res.status(400).json({
                        status: 'fail',
                        msg: "You dont have any Cart to pay"
                    });
                }
                const price = req.body.price;
                if (!user) {
                    return res.status(400).json({
                        status: 'fail',
                        msg: "Can't this user"
                    });
                }
                if (user.AccountPayment.balance < price) {
                    return res.status(400).json({
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

                const AccountAdmin = await Payment.findById(admin.AccountPayment._id)
                const AccountUser = await Payment.findById(user.AccountPayment._id)
                AccountAdmin.balance += price;
                admin.TotalMoneyTransaction += price;
                user.TotalMoneyTransaction += price;
                AccountUser.balance -= price;
                if (!user.Transaction) {
                    user.Transaction = [];
                }

                if (!admin.Transaction) {
                    admin.Transaction = [];
                }

                const transaction = {
                    idUser: user.id,
                    cart_id: user.Cart.map(cart => {
                        return {
                            product_id: cart.product_id,
                            quantity: cart.quantity
                        }
                    }),
                    time: new Date(),
                    moneyTransaction: price,
                    address: address,
                    phone: phone
                }
                const idTransaction = await Transaction.create(transaction);
                user.Transaction.push(idTransaction)
                admin.Transaction.push(idTransaction)

                user.Cart.splice(0);

                await user.save();
                await admin.save();
                await AccountAdmin.save();
                await AccountUser.save();
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