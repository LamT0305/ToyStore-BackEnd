const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({dest: "uploads/"})

const { getToys, createToys, updateToy, deleteToy, getToyByID } = require("../controllers/ToyController");

router.route("/").get(getToys).post(upload.single("image"), createToys);
router.route("/:id").get(getToyByID).put(updateToy).delete(deleteToy);

module.exports = router;