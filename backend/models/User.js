const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define User Schema
const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImageUrl: { type: String, default: null }, // Optional profile image
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

// 🔹 Hash password before saving (ONLY if not already hashed)
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Hash only if password is modified

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔹 Compare passwords during login
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export User model
module.exports = mongoose.model("User", UserSchema);
