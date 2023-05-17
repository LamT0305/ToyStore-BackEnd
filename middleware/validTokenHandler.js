const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authheader = req.headers.authorization || req.headers.Authorization;
    if (authheader && authheader.startsWith("Bearer")) {
        token = authheader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user;
            next();
        } catch (err) {
            return res.status(401).json({ error: "User is not authorized" });
        }
    }

    if (!token) {
        return res.status(401).json({ error: "User is not authorized" });
    }
});

module.exports = validateToken;

