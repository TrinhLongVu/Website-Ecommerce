const User = require('../models/user.model')
const Product = require('../models/product.model');
const Payment = require('../models/payment.model');
const middleware = require('../middeware/auth')

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

        const balance = {
            balance: money
        }


        const newPayment = await Payment.create(balance);
        user.Balance.push(newPayment)
        console.log(newPayment)
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

exports.getPayment = async (req, res, next) => { // get tài khoản của người dùng, tham số truyền vào là id của người dùng và id của tài khoản

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
        const { paymentid, totalPrice } = req.body
        const user = await User.findById(userId);
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
        if (balanceAccount.balance < totalPrice) {
            return res.status(200).json({
                status: 'fail',
                msg: "You do not have enough money to pay this payment"
            });
        }


        balanceAccount.balance -= totalPrice;

        if (!user.Transaction) {
            user.Transaction = [];
        }


        user.Transaction.push({
            cart_id: user.Cart.map(cart => cart.product_id),
            time: new Date()
        });

        user.Cart.splice(0);
        
        await user.save();

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