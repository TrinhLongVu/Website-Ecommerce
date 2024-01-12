const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transaction = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart_id: {
        type: Array,
        ref: 'Cart',
        default: []
    },
    time: {
        type: Date,
        default: new Date()
    },
    moneyTransaction: {
        type: Number,
        default: 0
    }
    // transaction: {
    //     type: Number,
    //     default: 'user',
    //     require: [true, 'A User must have a role']
    // },

})

const Transaction = mongoose.model('Transaction', transaction);

module.exports = Transaction;