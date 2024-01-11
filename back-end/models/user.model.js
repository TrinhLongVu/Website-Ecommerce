const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserName: {
        type: String,
        require: [true, 'A User must have a UserName']
    },
    Password: {
        type: String,
        require: [true, 'A User must have a Password']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    Role: {
        type: String,
        default: 'user',
        require: [true, 'A User must have a role']
    },
    FullName: {
        type: String,
        default: 'No Name'
    },
    type: {
        type: String,
        default: 'local'
    },
    Birthday: {
        type: Date
    },
    Gender: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Address: {
        type: String
    },
    Image_Avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBXqRKXezHfKsAvXX2HOz0QO_5dvdAj5s0Bg&usqp=CAU"
    },
    Cart: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }],
    Balance: [{
        payment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        },
        balance: {
            type: Number,
            default: 0
        }
    }],
    AccountPayment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null
    },
    Transaction: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        }
    ],
    TotalMoneyTransaction: {
        type: Number,
        default: 0
    }
})

const User = mongoose.model('Users', userSchema);

module.exports = User;