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
        type: String
    },
    Cart: [
        {
            product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          },
            quantity: Number
        }
    ]
})
// The same create table in sql server and table have name which is lowercase."article" 
const User = mongoose.model('Users', userSchema);

module.exports = User;