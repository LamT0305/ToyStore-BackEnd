const express = require('express');
const { placeOrder, viewOrder, viewListOrderByUserID } = require('../controllers/OrderController');
const validateToken = require('../middleware/validTokenHandler');
const router = express.Router();


router.post("/", placeOrder)
router.get("/", viewOrder)
router.route("/orderhistory").get(validateToken, viewListOrderByUserID)

module.exports = router