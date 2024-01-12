const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transaction = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cart_id: {
        type: Array,
        ref: 'products',
        default: []
    },
    time: {
        type: Date,
        default: new Date()
    },
    moneyTransaction: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        default: "no address"
    },
    phone: {
        type: Number,
        default: 0
    }
})

const Transaction = mongoose.model('Transaction', transaction);

module.exports = Transaction;