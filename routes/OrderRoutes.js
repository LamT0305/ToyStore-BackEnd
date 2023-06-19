const express = require('express');
const { placeOrder, viewOrder } = require('../controllers/OrderController');
const validateToken = require('../middleware/validTokenHandler');
const router = express.Router();


router.post("/", validateToken, placeOrder)
router.get("/", viewOrder)
module.exports = router