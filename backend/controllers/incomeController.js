//const User = require("../models/User");
const xlsx = require('xlsx');
const Income = require("../models/Income");

// ✅ Add Income Source
exports.addIncome = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure authentication middleware provides this
        const { icon, source, amount, date } = req.body;

        // ✅ Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Create new income record
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date), // Ensure date is valid
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ✅ Get all income sources
exports.getAllIncome = async(req, res)=>{
    const userId = req.user.id;
    try{
       const income = await Income.find({userId}).sort({date:-1});
       res.json(income);
    } catch{
        res.status(500).json({message:"Server Error"});
    }

    }

// ✅ Delete income source
exports.deleteIncome = async (req, res) => {
try{
    await Income.findByIdAndDelete(req.params.id);
    res.json({message:"Income deleted successfully"});

} catch (error){
    res.status(500).json({message:"Server Error"})
}
};

// ✅ Download Income Excel Sheet 
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({userId}).sort({date:-1});

        //prepare data for excel

        const data = income.map((item) => ({
            Source: item.source,
            Amount:item.amount,
            Date:item.date,

        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,'income_details.xlsx');

    } catch(error){
        res.status(500).json({message:"server Error"});
    }

};
