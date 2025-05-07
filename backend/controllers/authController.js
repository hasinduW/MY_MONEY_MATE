const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h"});
    };
    
    //Register User
    exports.registerUser =async(req, res) => {
        const{ fullName, email, password, profileImageUrl} = req.body;
    
        console.log("Received Data:", req.body); // Check if profileImageUrl is coming
        
        //validation : check for missing feilds
        if(!fullName || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        try{
            // check if email already exists
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json ({ message: "Email already in use"});
            }
    
            
            //create the user Create the user (password will be hashed automatically)
            const user = await User.create({
                fullName,
                email,
                password,
                profileImageUrl,
            });
    
            res.status(201).json({
                id: user._id,
                user,
                token: generateToken(user._id),
            });
    
        }catch (err){
            res
            .status(500)
            .json({message: "Error registering user", error: err.message});
        }
    
        };
    
    // Login User
    const loginUser = async (req, res) => {
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        try {
            // Find the user
            const user = await User.findOne({ email });
            
            if (!user || !(await user.comparePassword(password))) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
    
            res.status(200).json({
                id: user._id,
                user,
                token: generateToken(user._id),
            });
        } catch (err) {
            res.status(500).json({message: "Error registering user", error: err.message});
        }
    };
    
    // Get User Info
    const getUserInfo = async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: "Error getting user info", error: err.message });
        }
    };

    // Update User Profile
    const updateUserProfile = async (req, res) => {
        try {
            const userId = req.user._id;
            const { fullName, location, bio } = req.body;
    
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            const updatedFields = {};
            if (fullName !== undefined) updatedFields.fullName = fullName;
            if (location !== undefined) updatedFields.location = location;
            if (bio !== undefined) updatedFields.bio = bio;
    
            let oldImagePath = null;
    
            if (req.file) {
                if (user.profileImageUrl) {
                    oldImagePath = path.join(__dirname, '..', user.profileImageUrl);
                }
                updatedFields.profileImageUrl = `/uploads/${req.file.filename}`;
                console.log("New image path set:", updatedFields.profileImageUrl);
                console.log("Old image path stored:", oldImagePath);
            }
    
            if (Object.keys(updatedFields).length === 0) {
                return res.status(400).json({ message: "No changes provided" });
            }
    
    
            // Perform the update
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: updatedFields },
                { new: true }
            ).select('-password');
    
            if (!updatedUser) {
                return res.status(404).json({ message: 'User update failed' });
            }
    
    
            if (oldImagePath) {
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error("Error deleting old profile image:", oldImagePath, err);
                    } else {
                        console.log("Successfully deleted old profile image:", oldImagePath);
                    }
                });
            }
    
            res.status(200).json(updatedUser);
    
        } catch (err) {
            console.error("Update Profile Error:", err);
            if (err.name === 'ValidationError') {
                return res.status(400).json({ message: "Validation failed", errors: err.errors });
            }
            res.status(500).json({ message: 'Server error during profile update', error: err.message });
        }
};

// Delete User Profile
const deleteUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const imagePathToDelete = user.profileImageUrl
            ? path.join(__dirname, '..', user.profileImageUrl)
            : null;

        await User.findByIdAndDelete(userId);

        if (imagePathToDelete) {
            fs.unlink(imagePathToDelete, (err) => {
                if (err) {
                    console.error("Error deleting profile image during account deletion:", imagePathToDelete, err);
                } else {
                    console.log("Deleted profile image during account deletion:", imagePathToDelete);
                }
            });
        }


        res.status(200).json({ message: 'User account deleted successfully' });

    } catch (err) {
        console.error("Delete Profile Error:", err);
        res.status(500).json({ message: 'Server error during profile deletion', error: err.message });
    }
};

// Export the functions
module.exports = {
    registerUser,
    loginUser,
    getUserInfo,
    updateUserProfile,
    deleteUserProfile
};


