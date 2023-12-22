const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String
    }
})

const catagory = mongoose.model('Category', categorySchema);

module.exports = catagory;