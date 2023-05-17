const CartModel = require('../models/CartModel');
const asyncHandler = require("express-async-handler")
const { paginate } = require("../function");

// Get cart by user ID
const getCartByUserId = asyncHandler(async (req, res) => {
    const cart = await CartModel.findOne({ user_id: req.user.id })
        .populate("items.toy_id")
        .populate("user_id");

    if (cart) {
        res.json({ status: "success", cart: cart });
    } else {
        await CartModel.create({
            user_id: req.user.id,
            items: [],
        })

        res.status(200).json({ status: "success", cart: cart });
    }
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

const updateCartUser = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        res.status(401)
        throw new Error("User is not authorized")
    }

    const { id } = req.params;
    const { quantity } = req.body;

    if (!id || !quantity) {
        res.status(400);
        throw new Error(" All items must be provided");
    }
    const cart = await CartModel.findOneAndUpdate(
        { user_id: req.user.id, 'items.toy_id': id },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
    ).populate('items.toy_id');



    res.status(201).json({message:"Updated quantity successfully", status: 'success'});

});

module.exports = {
    getCartByUserId,
    addToCart,
    removeFromCart,
    updateCartUser
}
