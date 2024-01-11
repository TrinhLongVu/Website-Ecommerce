const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({
    path: path.join(__dirname, '..', 'config.env')
});


exports.isLoggedUser = (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                "status": "fail",
                "msg": "token is not exits."
            })
        }

        if (req.user.Role == 'user') {
            jwt.verify(token, process.env.KEY_TOKEN, async (err, data) => {
                if (err) {
                    console.error('JWT Verification Failed:', err.message);
                } else {
                    try {
                        req.user = await User.findById(data.id);
                        next();
                    } catch (error) {
                        console.error('Error fetching user from database:', error.message);
                        return res.status(500).json({
                            status: 'error',
                            msg: 'Internal Server Error',
                        });
                    }
                }
            });
        } else {
            res.send('401', 'Unauthorized')
        }
    } else {
        res.status(401).send('Unauthorized')
    }
}


exports.isLoggedAdmin = (req, res, next) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                "status": "fail",
                "msg": "token is not exits."
            })
        }

        if (req.user.Role == 'admin') {
            jwt.verify(token, process.env.KEY_TOKEN, async (err, data) => {
                if (err) {
                    console.error('JWT Verification Failed:', err.message);
                } else {
                    try {
                        req.user = await User.findById(data.id);
                        next();
                    } catch (error) {
                        console.error('Error fetching user from database:', error.message);
                        return res.status(500).json({
                            status: 'error',
                            msg: 'Internal Server Error',
                        });
                    }
                }
            });
        } else {
            res.send('401', 'Unauthorized')
        }
    } else {
        res.status(401).send('Unauthorized')
    }
}

exports.isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({
                "status": "fail",
                "msg": "token is not exits."
            })
        }

        jwt.verify(token, process.env.KEY_TOKEN, async (err, data) => {
            if (err) {
                console.error('JWT Verification Failed:', err.message);
            } else {
                try {
                    req.user = await User.findById(data.id);
                    next();
                } catch (error) {
                    console.error('Error fetching user from database:', error.message);
                    return res.status(500).json({
                        status: 'error',
                        msg: 'Internal Server Error',
                    });
                }
            }
        });
    } else {
        res.status(401).send('Unauthorized')
    }
}