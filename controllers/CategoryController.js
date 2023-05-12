const asyncHandler = require("express-async-handler");
const { paginate } = require("../function");
const Category = require("../models/CategoryModel")


// GET category
// access Public
const getCategory = asyncHandler(async (req, res) => {
    const page = parseInt(req.params.query) || 1;
    const category = await paginate(Category, page, 10)
    res.status(200).json({ status: 'success', category: category });
})

// Create a new category
// access Private
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Name filed is required");
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        res.status(400);
        throw new Error('Category already exists');
    }
    const category = await Category.create({
        name: name,
    });
    console.log("Category created successfully.");
    res.status(201).json({ status: 'success', category: category });
});

// Update category
//Method PUT /api/category
// access private
const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Name filed is required");
    }

    const isAvailable = await Category.findById(req.params.id)
    if (!isAvailable) {
        res.status(404);
        throw new Error("Category not found");
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({ status: "success", category: category })
})

// DELETE /category
// access private
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(404)
        throw new Error("not found")
    }

    await Category.findByIdAndRemove(req.params.id)
    res.status(200).json({ status: "success", message: `Delete contact information for ${req.params.id} successfully!` });
})

module.exports = { getCategory, createCategory, updateCategory, deleteCategory };