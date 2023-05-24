const asyncHandler = require("express-async-handler");
const { paginate } = require("../function");
const StoreModel = require("../models/StoreModel")

// GET Store
// access private
const getStore = asyncHandler(async (req, res) => {
    const page = parseInt(req.params.query) || 1;
    const store = await paginate(StoreModel, page, 10)
    res.status(200).json({ status: 'success', store: store });
})

// Create a new Store
// access Private
const createStore = asyncHandler(async (req, res) => {
    const { name, city } = req.body;
    if (!name || !city) {
        return res.json({ message: "All fields must be provided", error: true });
    }

    const isAvailable = await StoreModel.findOne({ name: name })

    if (isAvailable) {
        return res.json({ message: "Name is already exists", error: true });
    }

    const store = await StoreModel.create({
        name: name,
        city: city
    });
    res.status(201).json({ status: 'success', store: store });
});

// Update Store
//Method PUT /api/category
// access private
const updateStore = asyncHandler(async (req, res) => {
    const { name, city } = req.body;
    if (!name || !city) {
        res.status(400);
        throw new Error("Name filed is required");
    }

    const isAvailable = await StoreModel.findById(req.params.id)
    if (!isAvailable) {
        res.status(404);
        throw new Error("Store not found");
    }

    const Store = await StoreModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({ status: "success", store: Store })
})

// DELETE /Store
// access private
const deleteStore = asyncHandler(async (req, res) => {
    const store = await StoreModel.findById(req.params.id)
    if (!store) {
        return res.json({ error: true, message: 'Store not found' })
    }

    await StoreModel.findByIdAndRemove(req.params.id)
    res.status(200).json({ status: "success", message: `Delete Store information for ${req.params.id} successfully!` });
})

module.exports = { getStore, createStore, updateStore, deleteStore };