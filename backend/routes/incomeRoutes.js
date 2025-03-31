const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Correct route definitions
router.post("/add", protect, addIncome); // Add income
router.get("/all", protect, getAllIncome); // Get all incomes
router.get("/download-excel", protect, downloadIncomeExcel); // Download Excel report
router.delete("/:id", protect, deleteIncome); // Delete income by ID

module.exports = router;
