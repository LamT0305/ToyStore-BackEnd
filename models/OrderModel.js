const mongoose = require('mongoose');

const schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phoneNumber: {
        type: 'string',
        default: null
    },
    address: {
        type: 'string',
        default: null
    },
    orderItems: [
        {
            toy_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Toy',
                required: true
            },
            quantity: {
                type: 'number',
                required: true
            }
        }
    ]
})

module.exports = mongoose.model("Order", schema)