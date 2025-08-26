const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: true,  // Ensure title is mandatory
        trim: true 
    },
    title: {
        type: String,
        required: true,  // Ensure title is mandatory
        trim: true       // Removes any leading/trailing spaces
    },
    weight: {
        type: Number,
        required: true,  // Ensure weight is mandatory
        min: 0           // Ensures that weight can't be negative
    },
    price: {
        type: Number,
        required: true,  // Ensure price is mandatory
        min: 0           // Ensures price can't be negative
    }
}, { timestamps: true });

const productModel = mongoose.model("products", productsSchema)
module.exports = productModel;
