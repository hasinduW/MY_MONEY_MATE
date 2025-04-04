require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const path = require("path"); // ✅ Correct path module import

const app = express();

// ✅ Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json()); // ✅ Parses JSON data
app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data

// ✅ Connect to MongoDB
connectDB();

// ✅ Correct Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes); // ✅ FIXED: Correct income routes
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve the upload folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server listening on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
