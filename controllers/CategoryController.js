const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel")


// GET category
// access Public
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.find();
    res.status(200).json({ status: 'success', category: category });
})

// Create a new category
// access Private
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.json({ error: true, message: 'Invalid category name provided' })
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        return res.json({ error: true, message: 'Category already exists' })
    }
    const category = await Category.create({
        name: name,
    });
    console.log("Category created successfully.");
    const cate = {
        _id: category._id,
        name: category.name
    }
    res.status(201).json({ status: 'success', category: cate });
});

// Update category
//Method PUT /api/category
// access private
const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.json({ error: true, message: 'Invalid category name provided' })
    }

    const isAvailable = await Category.findById(req.params.id)
    if (!isAvailable) {
        return res.json({ error: true, message: 'Not found' })
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
    if (!category) {
        return res.json({ error: true, message: 'Not found' })
    }

    await Category.findByIdAndRemove(req.params.id)
    res.status(200).json({ status: "success", message: `Delete contact information for ${req.params.id} successfully!` });
})

module.exports = { getCategory, createCategory, updateCategory, deleteCategory };