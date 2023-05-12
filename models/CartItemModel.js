const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    toy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Toy',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = cartItemSchema


