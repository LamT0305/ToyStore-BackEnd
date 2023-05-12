const express = require('express');
const router = express.Router();
const { getToys, createToys, updateToy, deleteToy, getToyByID } = require("../controllers/ToyController");

router.route("/").get(getToys).post(createToys);
router.route("/:id").get(getToyByID).put(updateToy).delete(deleteToy);

module.exports = router;