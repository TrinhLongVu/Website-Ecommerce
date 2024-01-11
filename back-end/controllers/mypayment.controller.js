const User = require('../models/user.model')
const Product = require('../models/product.model');
const Payment = require('../models/payment.model');
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

        const balance = {
            balance: money
        }


        const newPayment = await Payment.create(balance);
        user.Balance.push(newPayment)
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

exports.payMoney = async (req, res, next) => {
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

exports.Verify = async (req, res, next) => { 
    try {
        // req.user.token;

        // const id = "req.user._id"
        const id = "659ebfb3a8dc9b4a55e37d3e"
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
            // req.user.token = result.token;
            console.log(result.token)
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

exports.paytest = async (req, res) => {
    try {
        // req.user.token;
        const url = 'http://localhost:3001/api/v1/payment/pay';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWViZmIzYThkYzliNGE1NWUzN2QzZSIsImlhdCI6MTcwNDk2OTcwNiwiZXhwIjoxNzA0OTY5NzY2fQ.3llznLIOiZEruLF-FBvTrx52uIyxuTeKa_v42ogKK1E",
                    money: 1200
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
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