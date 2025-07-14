//Connecting to MongoDB
// $ npm install mongoose

const mongoose = require("mongoose");

mongoose.set('debug', true); 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB successfully on host: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectDB;