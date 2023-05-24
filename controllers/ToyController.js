const asyncHandler = require("express-async-handler");
const { paginate } = require("../function");
const ToysModel = require("../models/ToysModel")


// GET Toys
// GET /api/toys

const getToys = asyncHandler(async (req, res) => {
    const page = parseInt(req.params.query) || 1;
    const toys = await paginate(ToysModel, page, 10, 'category_id');
    res.status(200).json({ status: 'success', toys: toys });
});

// CREATE Toys
// POST /api/toys

const createToys = asyncHandler(async (req, res) => {
    const { name, price, description, category_id } = req.body;
    const image = req.file;

    if (!name || !price || !image || !description || !category_id) {
        return res.json({ status: "failed", message: "All fields must be provided" })
    }

    const isExist = await ToysModel.findOne({ name: name });
    if (isExist) {
        return res.json({ status: "failed", message: "Toy name already exists" });
    }

    const toy = await ToysModel.create({
        name: name,
        price: price,
        image: image.filename,
        description: description,
        category_id: category_id,
    });

    console.log("Toy created successfully.");
    res.status(201).json({ status: 'success', toy: toy });
});

const updateToy = asyncHandler(async (req, res) => {
    const toy = ToysModel.findById(req.params.id);

    if (!toy) {
        return res.json({ status: "failed", message: "Toy not found" });
    }

    const { name, price, image, description, category_id } = req.body
    if (!name || !image || !price || !category_id || !description) {
        return res.json({ status: "failed", message: "All fields must be provided" })
    }

    const updateToy = await ToysModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json({ status: "success", toy: updateToy })
});

const deleteToy = asyncHandler(async (req, res) => {
    const toy = ToysModel.findById(req.params.id);

    if (!toy) {
        return res.json({ status: "failed", message: "Toy not found" });
    }

    await ToysModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ status: "success", });
})

const getToyByID = asyncHandler(async (req, res) => {
    const toy = await ToysModel.findById(req.params.id).populate('category_id')
    if (!toy) {
        return res.json({ status: "failed", message: "Toy not found" });
    }

    res.status(200).json({ status: "success", toy: toy });

})

module.exports = { getToys, createToys, updateToy, deleteToy, getToyByID }