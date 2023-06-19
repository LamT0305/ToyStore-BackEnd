const asyncHandler = require("express-async-handler")
const OrderModel = require("../models/OrderModel")
const CartModel = require("../models/CartModel")

const placeOrder = asyncHandler(async (req, res) => {
    const { phoneNumber, address } = req.body
    const user = req.user

    if (!phoneNumber || !address) {
        throw new Error("Invalid phone number & address provided")
    }

    if (!user) {
        res.status(401);
        throw new Error("User is not logged in")
    }

    const cartUser = await CartModel.findOne({ user_id: user.id })

    const orderItems = cartUser.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
    }));

    await OrderModel.create({
        user_id: user.id,
        orderItems: orderItems,
        phoneNumber: phoneNumber,
        address: address
    })

    await CartModel.findOneAndDelete({ user_id: user.id })

    res.send({ status: "success" })

})

const viewOrder = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find()
        .populate("user_id")
        .populate("orderItems.toy_id"); // Corrected field path for populating toy_id

    res.send({ status: "success", orders: orders });
});

module.exports = { placeOrder, viewOrder }