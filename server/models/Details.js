const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
    
    finalQuantity: {
        type: Number,
        default: 1,
        min: 1
    },
    finalWeight: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    }
});

const Details = mongoose.models.Details || mongoose.model('Details', detailsSchema);

module.exports = Details;
