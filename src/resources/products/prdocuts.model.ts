const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    year: Number,
    desc: String,
    price: Number,
    color: String,
})

export const Product = mongoose.model('product', productSchema)