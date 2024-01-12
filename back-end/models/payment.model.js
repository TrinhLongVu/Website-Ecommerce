const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    balance: {
        type: Number,
        default: 100000
    }
})

const payment = mongoose.model('Payment', paymentSchema);

module.exports = payment;