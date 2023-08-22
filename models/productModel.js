const mongoose = require('mongoose')
const {models} = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "This field is required!"]
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        require: [true, "This field is require!"]
    }

},{
    timestamps: true
})


const Product = mongoose.model("Product", productSchema)
module.exports = Product;