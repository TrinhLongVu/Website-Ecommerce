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
        let days;
        if (req.query.week) {
            const today = new Date();
            let startWeek = new Date();
            let endWeek = new Date();

            startWeek.setDate(today.getDate() - today.getDay() + 1);
            endWeek.setDate(startWeek.getDate() + 6);
            days = helper.getWeekDates(startWeek, endWeek)
        } else if (req.query.month) {
            const today = new Date();
            let startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            let endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            // for (const user of users) {
            //     for (const transaction of user.Transaction) {
            //         if(transaction.time > startMonth && transaction.time < endMonth)
                    
            //     }
            // }
        }


        const users = await User.find();
        const result = {};
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
        res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}