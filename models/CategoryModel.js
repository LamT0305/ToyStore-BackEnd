const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("Category", categorySchema);