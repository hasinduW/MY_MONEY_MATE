
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
require("dotenv").config();
const app = express();

//Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],

    })
);


app.use(express.json());

app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data

//  Connect to MongoDB
connectDB();

// ✅ Correct Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/income", incomeRoutes); // ✅ FIXED: Correct income routes
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/users", require("./routes/authRoutes"));

// Serve the upload folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server listening on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
