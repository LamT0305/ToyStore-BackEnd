const asyncHandler = require("express-async-handler");
const Inventory = require("../models/InventoryModel");
const { paginate } = require("../function");

// Get all inventory
const getAllInventory = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const inventory = await paginate(Inventory, page, 10, 'toy_id');
    res.status(200).json({ status: "success", inventory: inventory });
});

// Add new inventory
const addInventory = asyncHandler(async (req, res) => {
    const { store_id, toy_id, quantity } = req.body;
    if (!store_id || !toy_id || !quantity) {
        return res.json({ status: 'failed', message: "All items must be provided" })
    }
    const inventory = await Inventory.create({ store_id, toy_id, quantity });
    res.status(201).json({ status: "success", inventory: inventory });
});

// Update inventory
const updateInventory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;
    if (!quantity) {
        return res.json({ status: "failed", message: "Invalid quantity" })
    }
    const inventory = await Inventory.findById(id);

    if (inventory) {
        const inventory = await Inventory.findByIdAndUpdate(
            id,
            {$set: {'quantity_available': quantity}},
            { new: true }
        )
        res.status(200).json({ status: "success", inventory: inventory })
    } else {
        return res.status("Not Found")
    }
});

// Delete inventory
const deleteInventory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const inventory = await Inventory.findById(id);

    if (inventory) {
        await inventory.remove();
        res.json({ message: "Inventory removed" });
    } else {
        return res.status("Not Found")
    }
});

const getInventoryByStore = asyncHandler(async (req, res) => {
    const store_id = req.query.store_id
    if (!store_id) {
        return res.json({ error: true, message: " You must provide a store" })
    }
    const inventory = await Inventory.find({ store_id: store_id }).populate("store_id").populate("toy_id");
    if (inventory) {
        const object = {
            store_id: inventory.store_id,
            toy: inventory.toy_id,
            quantity: inventory.quantity
        }
        return res.json({ status: "success", inventory: inventory })
    } else {
        return res.json({ error: true, message: " Inventory not found" })
    }
})

module.exports = {
    getAllInventory,
    addInventory,
    updateInventory,
    deleteInventory,
    getInventoryByStore
}