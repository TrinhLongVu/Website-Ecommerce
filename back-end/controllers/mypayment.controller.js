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
        const {
            price,
            address,
            phone
        } = req.body;

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
        const query = req.query;
        let id = req.params.id;
        if (query.role == 'admin') {
            id = process.env.ADMINID;
        }
        const skip = (query.page - 1) * query.limit;
        const user = await User.findById(id)
            .populate({
                path: 'Transaction',
                select: 'Transaction time address phone',
                populate: [{
                    path: 'cart_id',
                    select: 'product_id quantity',
                    populate: {
                        path: 'product_id',
                        select: 'title image category price',
                        populate: {
                            path: 'category',
                            select: 'name'
                        }
                    }
                },
                {
                    path: 'idUser',
                    select: 'FullName'
                }
                ]

            })


        let Transaction = user.Transaction;
        const paginatedResults = Transaction.slice(skip, skip + query.limit * 1.0);
        const totalpage = Math.ceil(Transaction.length / query.limit)
        res.status(200).json({
            status: "success",
            data: paginatedResults,
            totalPage: totalpage
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: error
        });
    }
}