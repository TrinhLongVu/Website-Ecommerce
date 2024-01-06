const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    balance: {
        type: Number,
        default: 0
    }
})

const payment = mongoose.model('Payment', paymentSchema);

module.exports = payment;