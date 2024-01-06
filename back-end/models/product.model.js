const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A Product must have a title']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'A Product must have a catagory']
    },
    detail: {
        type: String
    },
    posted_time: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    price:{
        type: Number,
        required: [true, 'Product must have price']
    }
})
// The same create table in sql server and table have name which is lowercase."article" 
const product = mongoose.model('products', productSchema);

module.exports = product;