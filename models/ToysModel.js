const mongoose = require('mongoose');

const toySchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    price: {
        type: 'string',
        required: true,
    },
    image: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("Toy", toySchema);