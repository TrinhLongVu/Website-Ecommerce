const User = require('../models/user.model')
const dotenv = require('dotenv')
const https = require('https');
const fs = require('fs');

dotenv.config({
    path: './config.env'
});

exports.getAllPayment = async (req, res) => {
    try {
        let id = req.user._id;
        
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/v1/payment/balance/' + id,
            method: 'GET',
            ca: fs.readFileSync('./openssl/cert.pem', 'utf8'),
            headers: {
                'creatatial': 'true',
                'Content-Type': 'application/json'
            }
        };

        const request = https.get(options, (response) => {
            let data = '';
            response.on('data', (d) => {
                data += d;
            });

            response.on('end', () => {
                try {
                    const balance = JSON.parse(data);
                    res.status(200).json(balance)
                } catch (error) {
                    res.status(500).json({
                        status: 'error',
                        msg: 'Error parsing response'
                    });
                }
            });
        });
        request.on('error', (e) => {
        console.error(`Error: ${e.message}`);
        });
        request.end();
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

        const id = req.user.id;

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

            response.on('data', (d) => {
                result += d;
            });

            response.on('end', () => {
                try {
                    result = JSON.parse(result);
                    req.session.token = result.token;
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
        request.write(data);
        request.end();

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
        console.log(id)
        const skip = (query.page - 1) * query.limit;
        
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/api/v1/payment/history/' + id,
            method: 'GET',
            ca: fs.readFileSync('./openssl/cert.pem', 'utf8'),
            headers: {
                'creatatial': 'true',
                'Content-Type': 'application/json'
            }
        };

        const request = https.get(options, (response) => {
            let data = '';
            response.on('data', (d) => {
                data += d;
            });

            response.on('end', () => {
                try {
                    const user = JSON.parse(data).data;
                    let Transaction = user.Transaction;
                    const paginatedResults = Transaction.slice(skip, skip + query.limit * 1.0);
                    const totalpage = Math.ceil(Transaction.length / query.limit)
                    res.status(200).json({
                        status: "success",
                        data: paginatedResults,
                        totalPage: totalpage
                    })
                } catch (error) {
                    res.status(500).json({
                        status: 'error',
                        msg: 'Error parsing response'
                    });
                }
            });
        });
        request.on('error', (e) => {
        console.error(`Error: ${e.message}`);
        });
        request.end();
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            msg: error
        });
    }
}