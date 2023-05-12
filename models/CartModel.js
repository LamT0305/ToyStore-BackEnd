const mongoose = require('mongoose');
// const cartItemSchema = require('./CartItemModel');

const cartSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        toy_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Toy',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        
    }]
},
{
    timestamps: true
})

module.exports = mongoose.model("Cart", cartSchema)