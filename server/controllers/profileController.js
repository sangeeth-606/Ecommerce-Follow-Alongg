
const Profile = require('../models/profile');
const User = require('../models/user');

// const createProfile = async (req, res) => {
//     try {
//         const { userEmail, profileUrl, address } = req.body;

//         if (!userEmail || !profileUrl || !address) {
//             return res.status(400).json({ success: false, message: "Please provide all required fields" });
//         }

//         // Find user by email
//         const user = await User.findOne({ email: userEmail });
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Check if profile already exists
//         const existingProfile = await Profile.findOne({ user: user._id });
//         if (existingProfile) {
//             return res.status(400).json({ success: false, message: "Profile already exists" });
//         }

//         // Create profile
//         const profile = await Profile.create({
//             user: user._id, // Store ObjectId, not email
//             profileUrl,
//             addresses: [address]
//         });

//         res.status(201).json({ success: true, profile });

//     } catch (err) {
//         res.status(500).json({ success: false, message: "Error creating profile", error: err.message });
//     }
// };
const createProfile = async (req, res) => {
    try {
        const { userEmail, profileUrl, address } = req.body;

        console.log("Request Body:", req.body); // Debugging

        if (!userEmail || !profileUrl || !address) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        // Find user by email
        const user = await User.findOne({ email: userEmail });
        console.log("Found User:", user); // Debugging

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if profile already exists
        const existingProfile = await Profile.findOne({ user: user._id });
        console.log("Existing Profile:", existingProfile); // Debugging

        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Profile already exists" });
        }

        // Create profile
        const profile = await Profile.create({
            user: user._id, // Store ObjectId, not email
            profileUrl,
            addresses: [address]
        });

        console.log("Profile Created:", profile); // Debugging
        res.status(201).json({ success: true, profile });

    } catch (err) {
        console.error("Error:", err); // Debugging
        res.status(500).json({ success: false, message: "Error creating profile", error: err.message });
    }
};


const getProfile = async (req, res) => {
    try {
        const { userEmail } = req.query;
        if (!userEmail) {
            return res.status(400).json({ success: false, message: "User email is required" });
        }

        // Find user by email to get ObjectId
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find profile using ObjectId
        const profile = await Profile.findOne({ user: user._id });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        res.status(200).json({ success: true, profile });

    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching profile", error: err.message });
    }
};

module.exports = { createProfile, getProfile };
