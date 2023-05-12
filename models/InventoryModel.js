const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true
    },
    toy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Toy",
        required: true

    },
    quantity_available: {
        type: 'string',
        required: true
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model("Inventory", inventorySchema) 