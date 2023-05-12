const express = require('express');
const router = express.Router();
const { register, loginUser, currentUser } = require("../controllers/UserController");
const validateToken = require('../middleware/validTokenHandler');


router.route("/register").post(register);
router.route("/login").post(loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;