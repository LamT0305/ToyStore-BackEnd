const asyncHandler = require("express-async-handler");
const { paginate } = require("../function");
const ToysModel = require("../models/ToysModel")
const InventoryModel = require("../models/InventoryModel")
const fs = require('fs');
const path = require("path");

// GET Toys
// GET /api/toys

const getToys = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const toys = await paginate(ToysModel, page, 10, 'category_id', 'store_id');
    res.status(200).json({ status: 'success', toys: toys });
});

// CREATE Toys
// POST /api/toys

const createToys = asyncHandler(async (req, res) => {
    const { name, price, description, category_id, quantity, store_id } = req.body;
    const image = req.file;

    if (!name || !price || !image || !description || !category_id || !quantity || !store_id) {
        return res.json({ status: "error", message: "All fields must be provided" })
    }

    const isExist = await ToysModel.findOne({ name: name });
    if (isExist) {
        return res.json({ status: "error", message: "Toy name already exists" });
    }

    const toy = await ToysModel.create({
        name: name,
        price: price,
        image: image.filename,
        description: description,
        category_id: category_id,
        store_id: store_id,
    });

    await InventoryModel.create({
        store_id: store_id,
        toy_id: toy._id,
        quantity_available: quantity
    })
    console.log("Toy created successfully.");
    res.status(201).json({ status: 'success' });
});

const updateToy = asyncHandler(async (req, res) => {
    const toy = await ToysModel.findById(req.params.id);

    if (!toy) {
        return res.json({ status: "error", message: "Toy not found" });
    }

    const { name, price, description, category_id, store_id } = req.body;

    if (!name || !price || !category_id || !description || !store_id) {
        return res.json({ status: "error", message: "All fields must be provided" });
    }

    // Check if a new image is uploaded
    if (req.file) {
        // Remove the existing image
        const imagePath = path.join(__dirname, `../uploads/${toy.image}`);
        try {
            fs.unlinkSync(imagePath);
        } catch (err) {
            console.log(err);
        }

        toy.image = req.file.filename;
    }

    toy.name = name;
    toy.price = price;
    toy.description = description;
    toy.category_id = category_id;
    toy.store_id = store_id;

    try {
        await toy.save();
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.json({ status: "error", message: "Failed to update toy" });
    }
});



const deleteToy = asyncHandler(async (req, res) => {
    const toy = ToysModel.findById(req.params.id);

    if (!toy) {
        return res.json({ status: "error", message: "Toy not found" });
    }

    await ToysModel.findByIdAndDelete(req.params.id)
    await InventoryModel.deleteOne({ toy_id: req.params.id })

    res.status(200).json({ status: "success", });
})

const getToyByID = asyncHandler(async (req, res) => {
    const toy = await ToysModel.findById(req.params.id).populate('category_id').populate('store_id');
    if (!toy) {
        return res.json({ status: "error", message: "Toy not found" });
    }

    res.status(200).json({ status: "success", toy: toy });

})

module.exports = { getToys, createToys, updateToy, deleteToy, getToyByID }