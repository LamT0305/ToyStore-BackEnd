const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    city:{
        type: 'string',
        required: true
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("Store", storeSchema);