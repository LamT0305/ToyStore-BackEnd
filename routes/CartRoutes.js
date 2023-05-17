const express = require("express")
const router = express.Router();
const { getCartByUserId, addToCart, removeFromCart, updateCartUser } = require("../controllers/CartController");
const validateToken = require("../middleware/validTokenHandler");

router.use(validateToken)
router.route("/").get(getCartByUserId).post(addToCart)
router.route("/:id").delete(removeFromCart).put(updateCartUser)


module.exports = router