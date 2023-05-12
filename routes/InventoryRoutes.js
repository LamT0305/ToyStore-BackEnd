const express = require('express');
const router = express.Router();
const { getAllInventory, addInventory, updateInventory, deleteInventory } = require("../controllers/InventoryController")

router.route("/").get(getAllInventory).post(addInventory);
router.route("/:id").put(updateInventory).delete(deleteInventory);
module.exports = router