const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transaction = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        default: new Date()
    },
    transaction: {
        type: String,
        default: 'user',
        require: [true, 'A User must have a role']
    }
})

const Transaction = mongoose.model('Transaction', transaction);

module.exports = Transaction;