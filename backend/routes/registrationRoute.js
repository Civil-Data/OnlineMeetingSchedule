// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../schemas/userSchema");

// // Handle user registration
// router.post("/register", async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Check if the username or email is already in use
//         const existingUser = await User.findOne({
//             $or: [{ username }, { email }],
//         });
//         if (existingUser) {
//             return res
//                 .status(400)
//                 .json({ message: "Username or email is already in use" });
//         }

//         // Hash the password before saving it
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user document
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({
//             message: "Registration failed YOU DUMB ASS!!!!",
//         });
//     }
// });

// module.exports = router;
