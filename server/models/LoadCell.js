const mongoose = require('mongoose');

const loadCellSchema = new mongoose.Schema({
    cartId: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true,
        min: 0  // Ensure that the weight cannot be negative
    },
    timestamp: {
        type: Date,
        default: Date.now,  // Automatically set the timestamp to the current date and time
        required: true
    },
    status: {
        type: String,
        enum: ['stable', 'overload', 'underweight'],  // Possible statuses for the load cell reading
        default: 'stable'  // Default status
    }
});

const LoadCellModel = mongoose.model("LoadCell", loadCellSchema);
module.exports = LoadCellModel;