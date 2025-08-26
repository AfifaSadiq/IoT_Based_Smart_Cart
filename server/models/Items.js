const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: true,
        trim: true 
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    totalWeight: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const itemsModel = mongoose.model("items", itemsSchema);
module.exports = itemsModel;
