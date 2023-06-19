const express = require('express');
const router = express.Router();
const { getAllInventory, addInventory, updateInventory, deleteInventory, getInventoryByStore } = require("../controllers/InventoryController")

router.route("/").get(getAllInventory).post(addInventory);
router.route("/:id").put(updateInventory).delete(deleteInventory);
router.route("/store").get(getInventoryByStore)

module.exports = router