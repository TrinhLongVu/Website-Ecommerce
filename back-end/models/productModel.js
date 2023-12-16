const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    
})
// The same create table in sql server and table have name which is lowercase."article" 
const product = mongoose.model('products', productSchema);

module.exports = product;