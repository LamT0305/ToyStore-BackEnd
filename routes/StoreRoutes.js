const express = require('express');
const router = express.Router();
const { getStore, createStore, updateStore, deleteStore } = require("../controllers/StoreController");

router.route("/").get(getStore).post(createStore);
router.route("/:id").put(updateStore).delete(deleteStore);

module.exports = router;