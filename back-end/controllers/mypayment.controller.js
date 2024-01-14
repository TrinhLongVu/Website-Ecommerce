const User = require('../models/user.model')
const dotenv = require('dotenv')
const https = require('https');
const fs = require('fs');

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
        console.log("pay token: ",token);
        const { price, address, phone } = req.body;

        const paymentOptions = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/v1/payment/pay',
            method: 'POST',
            ca: fs.readFileSync('./openssl/cert.pem', 'utf8'),
            headers: {
                'creatatial': 'true',
                'Content-Type': 'application/json'
            }
        };

        const paymentRequest = https.request(paymentOptions, (paymentResponse) => {
            let data = '';
            paymentResponse.on('data', (d) => {
                data += d;
            });
            paymentResponse.on('end', () => {
                res.status(200).json({
                    status: 'success'
                });
            });
        });

        paymentRequest.on('error', (error) => {
            console.error(error);
        });

        paymentRequest.write(JSON.stringify({
            token: token,
            price: price,
            address: address,
            phone: phone
        }));
        paymentRequest.end();


        // const url = 'https://localhost:3001/api/v1/payment/pay';
        // try {
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             token: token,
        //             price: price,
        //             address: address,
        //             phone: phone
        //         }),
        //     });

        //     if (!response.ok) {
        //         const data = await response.json();
        //         const serverMsg = data.msg;
        //         res.status(200).json({
        //             status: 'fail',
        //             msg: serverMsg
        //         })
        //     } else {
        //         res.status(200).json({
        //             status: 'success'
        //         })
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // } 

    } catch (error) {
        res.status(405).json({
            status: 'fail',
            msg: error
        });
    }
}

exports.Verify = async (req, res) => {
    try {
        const https = require('https');

        const url = 'https://localhost:3001/api/v1/payment/verify';
        const id = req.user.id; // replace with the actual id

        const data = JSON.stringify({
            id: id
        });

        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/v1/payment/verify',
            method: 'POST',
            ca: fs.readFileSync('./openssl/cert.pem', 'utf8'),
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            },
        };

        const request = https.request(options, (response) => {
            let result = '';

            response.on('data', (chunk) => {
                result += chunk;
            });

            response.on('end', () => {
                try {
                    result = JSON.parse(result);
                    req.session.token = result.token;
                    console.log("token:", req.session.token);
                    res.status(200).json({
                        status: 'success'
                    });
                } catch (error) {
                    console.error('Error parsing response:', error.message);
                    res.status(500).json({
                        status: 'error',
                        msg: 'Error parsing response'
                    });
                }

            });
        });

        request.on('error', (error) => {
            console.error('Error:', error.message);
        });

        // Send the JSON payload
        request.write(data);

        // End the requestuest
        request.end();
        console.log("123456",req.session.token)

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