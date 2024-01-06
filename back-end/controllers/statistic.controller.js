const User = require('../models//user.model')
const helper = require('../helper/index')

exports.getTotalRevenue = async (req, res) => {
    try {
        const data = await User.find()
        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.transaction = async (req, res) => {
    try {
        const result = {};
        const year = req.query.year || new Date().getFullYear();
        const users = await User.find();
        if (req.query.week) {
            const today = new Date();
            let startWeek = new Date();
            let endWeek = new Date();

            startWeek.setDate(today.getDate() - today.getDay() + 1);
            endWeek.setDate(startWeek.getDate() + 6);
            let days = helper.getDate(startWeek, endWeek)

            for (const day of days) {
                result[day] = 0;
            }
            for (const day of days) {
                for (const user of users) {
                    for (const transaction of user.Transaction) {
                        if (helper.isDayEqual(transaction.time, day)) {
                            result[day] += 1;
                        }
                    }
                }
            }
        } else if (req.query.month) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            for (const month of months) {
                result[month] = 0;
            }

            for (const user of users) {
                for (const transaction of user.Transaction) {
                    for (let i = 0; i < months.length; i++) {
                        const {
                            start,
                            end
                        } = helper.getMonth(year, i);
                        if (transaction.time >= start && transaction.time <= end) {
                            result[months[i]] += 1;
                        }
                    }
                }
            }
        }

        res.status(200).json({
            status: 'success',
            year: year,
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}