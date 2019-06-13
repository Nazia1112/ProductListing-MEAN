const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({

    name: {
        type: String,
        required: true
    },
    SKU: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },

}, { timestamps: { createdAt: 'created_at' } });





module.exports = mongoose.model('nrProducts', Product);
