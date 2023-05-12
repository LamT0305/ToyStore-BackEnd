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
    const { name, price, image, description, category_id } = req.body

    if (!name || !price || !image || !description || !category_id) {
        res.status(400);
        throw new Error("All fileds are required");
    }
    const isExist = await ToysModel.findOne({ name: name })
    if (isExist) {
        res.status(400)
        throw new Error("Toy has already been created");
    }
    const toy = await ToysModel.create({
        name: name,
        price: price,
        image: image,
        description: description,
        category_id: category_id
    });
    console.log("Toy created successfully.");
    res.status(201).json({ status: 'success', toy: toy });
});


const updateToy = asyncHandler(async (req, res) => {
    const toy = ToysModel.findById(req.params.id);

    if (!toy) {
        res.status(404)
        throw new Error("Not Found");
    }

    const { name, price, image, description, category_id } = req.body
    if (!name || !image || !price || !category_id || !description) {
        res.status(400)
        throw new Error("All fields are required")
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
        res.status(404)
        throw new Error("Not Found");
    }

    await ToysModel.findByIdAndDelete(req.params.id)

    res.status(200).json({ status: "success", });
})

const getToyByID = asyncHandler(async (req, res) => {
    const toy = await ToysModel.findById(req.params.id).populate('category_id')
    if (!toy) {
        res.status(404)
        throw new Error("Not Found");
    }

    res.status(200).json({ status: "success", toy: toy });

})

module.exports = { getToys, createToys, updateToy, deleteToy, getToyByID }