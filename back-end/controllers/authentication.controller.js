const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const Payment = require('../models/payment.model')
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
const path = require('path');
dotenv.config({
    path: path.join(__dirname, '..', 'config.env')
});


exports.signout = (req, res) => {
    try {
        delete req.session.authToken;
    } catch (err) {
        res.status(401).json({
            status: "failed",
        })
    }
}

exports.fail = (req, res) => {
    res.status(401).json({
        status: "failed",
    })
}

exports.getAuthtoken = (req, res) => {
    try {
        res.status(200).json({
            authToken: req.session.authToken 
        })
    } catch (err) {
        res.status(400).json({
            status: "fail" 
        })
    }
}

exports.success = (req, res) => {
    const id = req.user._id;
    const token = jwt.sign({
        id
    }, process.env.KEY_TOKEN, {
        expiresIn: '5h'
    });
    req.session.authToken = token;
    // res.cookie('token', token, { expires: new Date(Date.now() + 30 * 1000) });
    res.redirect('http://localhost:5173')
}

exports.successLocal = (req, res) => {
    const id = req.user._id;
    const token = jwt.sign({
        id
    }, process.env.KEY_TOKEN, {
        expiresIn: '5h'
    });
    req.session.authToken = token;
    // res.cookie('token', token, { expires: new Date(Date.now() + 30 * 1000) });
    res.json({
        "token": token
    })
}

exports.signup = async (req, res) => {
    try {
        const {
            UserName,
            Password,
            ConfirmPassword
        } = req.body;
        if (!UserName || !Password || !ConfirmPassword) {
            return res.status(400).json({
                status: "fail",
                msg: "Please fill all the information",
            });
        }
        const isTaken = await User.findOne({
            "UserName": UserName
        });
        if (isTaken) {
            return res.status(400).json({
                status: "fail",
                msg: "Email is already taken",
            });
        }

        if (Password != ConfirmPassword) {
            return res.status(400).json({
                status: "fail",
                msg: "Confirm password and password don't match",
            });
        }

        if (Password.length < 6) {
            return res.status(400).json({
                status: "fail",
                msg: "Password must be at least 6 characters long",
            });
        }

        const NewBody = {
            UserName: UserName,
            Password: Password,
        }
        const fullname = NewBody.UserName.split("@")[0]
        const saltRounds = 10
        bcrypt.hash(NewBody.Password, saltRounds, async function (err, hash) {
            if (err) {
                return next(err);
            }

            let newPayment;
            try {
                newPayment = await Payment.create({balance: 100000});
            } catch (error) {
                console.error("Error creating payment:", error);
            }
            console.log(newPayment)
            const newUser = await User.create({
                UserName: NewBody.UserName,
                FullName: fullname,
                AccountPayment: newPayment._id,
                Password: hash
            });

            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
                }
            })
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            msg: err
        })
    }
}