const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(connect.connection.host, connect.connection.name)
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDB