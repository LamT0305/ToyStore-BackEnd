const CartModel = require('../models/CartModel');
const asyncHandler = require("express-async-handler")
const { paginate } = require("../function");

// Get cart by user ID
const getCartByUserId = asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const cart = await paginate(CartModel, page, 10, 'items.toy_id');
    res.json({ status: "success", cart: cart });
});

// Add item to cart
const addToCart = asyncHandler(async (req, res) => {

    const user = req.user;
    if (!user) {
        res.status(401);
        throw new Error("User is not logged in")
    }

    const { toy_id, quantity } = req.body;

    if (!toy_id || !quantity) {
        res.status(400);
        throw new Error(" All items must be provided");
    }

    const cartUser = await CartModel.findOne({ user_id: user.id })

    if (!cartUser) {
        await CartModel.create({
            user_id: user.id,
            items: [],
        })
    }

    // const isExistIndex = cartUser.items.fineIndex(item => item.id === toy_id)
    const existingItemIndex = cartUser.items.findIndex((item) => item.toy_id.toString() === toy_id);

    if (existingItemIndex === -1) {
        cartUser.items.push({ toy_id, quantity })
    } else {
        cartUser.items[existingItemIndex].quantity += quantity;
    }

    await cartUser.save();

    res.status(201).json({ status: 'success' });
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
    await CartModel.findOneAndUpdate(
        { user_id: req.user.id },
        { $pull: { items: { toy_id: req.params.id } } },
        { new: true }
    ).populate('items.toy_id');
    res.json({ status: 'success' });
});

module.exports = {
    getCartByUserId,
    addToCart,
    removeFromCart
}
