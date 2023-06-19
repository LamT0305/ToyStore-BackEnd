const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({dest: "uploads/"})

const { getToys, createToys, updateToy, deleteToy, getToyByID } = require("../controllers/ToyController");

router.route("/").get(getToys).post(upload.single("image"), createToys);
router.route("/:id").get(getToyByID).put(upload.single("image"),updateToy).delete(deleteToy);

module.exports = router;