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
        res.status(400)
        throw new Error("Invalid inventory id or quantity")
    }
    const inventory = await Inventory.create({ store_id, toy_id, quantity });
    res.status(201).json({ status: "success", inventory: inventory });
});

// Update inventory
const updateInventory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { store_id, toy_id, quantity } = req.body;
    if (!store_id || !toy_id || !quantity) {
        res.status(400)
        throw new Error("Invalid inventory id or quantity")
    }
    const inventory = await Inventory.findById(id);

    if (inventory) {
        const inventory = await Inventory.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        res.status(200).json({ status: "success", inventory: inventory })
    } else {
        res.status(404);
        throw new Error("Inventory not found");
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
        res.status(404);
        throw new Error("Inventory not found");
    }
});

module.exports = {
    getAllInventory,
    addInventory,
    updateInventory,
    deleteInventory
}