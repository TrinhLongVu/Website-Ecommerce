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

// exports.transaction = async (req, res) => {
//     try {
//         const result = {};
//         const year = req.query.year || new Date().getFullYear();
//         const users = await User.find();
//         if (req.query.week) {
//             const today = new Date();
//             let startWeek = new Date();
//             let endWeek = new Date();

//             startWeek.setDate(today.getDate() - today.getDay() + 1);
//             endWeek.setDate(startWeek.getDate() + 6);
//             let days = helper.getDate(startWeek, endWeek)

//             for (const day of days) {
//                 result[day] = 0;
//             }
//             for (const day of days) {
//                 for (const user of users) {
//                     for (const transaction of user.Transaction) {
//                         if (helper.isDayEqual(transaction.time, day)) {
//                             result[day] += 1;
//                         }
//                     }
//                 }
//             }
//         } else if (req.query.month) {
//             const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//             for (const month of months) {
//                 result[month].quantity = 0;
//                 result[month].balance = 0;
//             }

//             for (const user of users) {
//                 for (const transaction of user.Transaction) {
//                     for (let i = 0; i < months.length; i++) {
//                         const {
//                             start,
//                             end
//                         } = helper.getMonth(year, i);
//                         if (transaction.time >= start && transaction.time <= end) {
//                             result[months[i]].quantity += 1;
//                             result[months[i]].balance += 0;
//                         }
//                     }
//                 }
//             }
//         }

//         res.status(200).json({
//             status: 'success',
//             year: year,
//             data: result
//         })
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             msg: err.message
//         });
//     }
// }
exports.transaction = async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();
        const result = {};
        const users = await User.find().populate({
            path: 'Transaction',
            select: 'time moneyTransaction'
        });

        if (req.query.day) {
            const today = new Date();
            const startWeek = new Date(today);
            startWeek.setDate(today.getDate() - today.getDay() + 1);

            const endWeek = new Date(startWeek);
            endWeek.setDate(startWeek.getDate() + 6);

            const days = helper.getDate(startWeek, endWeek);
            const dayName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            for (const day of days) {
                result[day] = {
                    quantity: 0,
                    balance: 0
                };
            }

            for (const day of days) {
                if (day.getFullYear() === year) {
                    for (const user of users) {
                        for (const transaction of user.Transaction) {
                            if (helper.isDayEqual(transaction.time, day)) {
                                result[day].quantity += 1;
                                result[day].balance += transaction.moneyTransaction;
                            }
                        }
                    }
                }
            }
        } else if (req.query.week) {
            const month = new Date().getMonth();
            const weeksInMonth = helper.getWeeksInMonth(year, month);
            const daysInWeek = 7;

            for (let week = 1; week <= weeksInMonth; week++) {
                const weekKey = `Week ${week}`;
                result[weekKey] = {
                    quantity: 0,
                    balance: 0
                };

                const startOfWeek = helper.getStartOfWeek(year, month, week);
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + daysInWeek - 1);

                for (const user of users) {
                    for (const transaction of user.Transaction) {
                        if (transaction.time >= startOfWeek && transaction.time <= endOfWeek) {
                            result[weekKey].quantity += 1;
                            result[weekKey].balance += transaction.moneyTransaction;
                        }
                    }
                }
            }
        } else if (req.query.month) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            for (const month of months) {
                result[month] = {
                    quantity: 0,
                    balance: 0
                };
            }

            for (const user of users) {
                for (const transaction of user.Transaction) {
                    for (let i = 0; i < months.length; i++) {
                        const { start, end } = helper.getMonth(year, i);
                        if (transaction.time >= start && transaction.time <= end) {
                            result[months[i]].quantity += 1;
                            result[months[i]].balance += transaction.moneyTransaction;
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