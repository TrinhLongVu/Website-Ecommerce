const User = require('../models/user.model')
const dotenv = require('dotenv')

dotenv.config({
    path: './config.env'
});

exports.getAllPayment = async (req, res) => { // lấy ra tất cả tài khoản của người dùng, tham số truyền vào là id người dùng

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

exports.payMoney = async (req, res) => {
    try {
        const token = req.session.token;
        const { price, address, phone } = req.body;

        const url = 'https://paymentmegamall.onrender.com/api/v1/payment/pay';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    price: price,
                    address: address,
                    phone: phone
                }),
            });
    
            if (!response.ok) {
                const data = await response.json();
                const serverMsg = data.msg;
                res.status(200).json({
                    status: 'fail',
                    msg: serverMsg
                })
            } else {
                res.status(200).json({
                    status: 'success'
                })
            }
        } catch (error) {
            console.error('Error:', error);
        }
    

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: error
        });
    }
}

exports.Verify = async (req, res) => {
    try {
        const id = req.user._id
        
        const url = 'https://paymentmegamall.onrender.com/api/v1/payment/verify';
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
            req.session.token = result.token;
            console.log(result.token)
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

exports.getTransaction = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({
                path: 'Transaction',
                populate: {
                    path: 'cart_id',
                }
            })  
        
        res.status(200).json({
            status: "success",
            data: user
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: error
        });
    }
}
