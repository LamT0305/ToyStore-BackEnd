const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")

// Register
// POST

const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.json("All fields must be provided")
    }

    const isAvailable = await UserModel.findOne({ email: email })

    if (isAvailable) {
        return res.json("User is available")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role
    });

    res.status(201).json({ status: 'success', user: user._id, name: user.name, email: user.email, role: user.role })
})

//@des Login user
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json("All field must be provided")
    }

    const user = await UserModel.findOne({ email: email })

    // compare password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                user: user.name,
                email: user.email,
                id: user._id,
                role: user.role
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' })

        res.status(200).json({ status: "success", accessToken })
    } else {
        return res.json("Invalid password");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ status: "success", message: `get user successfully!`, user: req.user });
})

module.exports = { register, loginUser, currentUser } 