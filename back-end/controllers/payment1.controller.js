const User = require('../models/user.model')
const Product = require('../models/product.model');
const Payment = require('../models/payment.model');
const middleware = require('../middeware/auth')

exports.createPaymentAccount = async (req, res, next) => {
    try {
        const money = req.body.money; // Sửa lại đây nếu giá trị là balance
        const userId = req.params.id;
        // Kiểm tra xem user có tồn tại không
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
        await user.save(); // Lưu lại user sau khi thêm payment

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

exports.getPayment = async (req, res, next) => {

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

exports.getAllPayment = async (req, res, next) => {

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user){
            res.status(200).json({
                status: 'fail',
                msg: "Can't find anything"
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
