const express = require('express');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app = express();
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors");

connectDB();

app.use(cors());
const port = process.env.PORT;
app.use(express.json());
// API

app.use("/api/toys", require("./routes/ToyRoutes"));
app.use("/api/category", require("./routes/CategoryRoutes"))
app.use("/api/store", require("./routes/StoreRoutes"))
app.use("/api/inventory", require("./routes/InventoryRoutes"))
app.use("/api/user", require("./routes/UserRoutes"))
app.use("/api/cart", require("./routes/CartRoutes"))

app.use(errorHandler);
app.listen(port, () => {
    console.log("Server listening on " + port);
})
