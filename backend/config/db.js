const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{}); // No need for useNewUrlParser or useUnifiedTopology anymore
        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.error("Error Connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
