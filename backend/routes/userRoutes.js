const express = require("express");
const router = express.Router();
// const User = require("../schemas/userSchema");
// const bcrypt = require("bcrypt");
const { GetUsers } = require("../controllers/userController");

router.get("/users", GetUsers);

// // Create a new user
// router.post("/users", async (req, res) => {
// 	try {
// 		const newUser = new User(req.body);
// 		const savedUser = await newUser.save();
// 		res.status(201).json(savedUser);
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// });

// // Retrieve one user matching email
// router.get("/users/:email", async (req, res) => {
// 	try {
// 		console.log(req);
// 		console.log(res);
// 		//     const { email } = req.body;

// 		//     // Check if the username or email is already in use
// 		//     const existingUser = await User.findOne({
// 		//         email: email,
// 		//     });
// 		//     if (existingUser) {
// 		//         return res.status(400).json({ message: "Email is already in use" });
// 		//     }
// 		// } catch (error) {
// 		//     console.error("Registration error:", error);
// 		//     res.status(500).json({
// 		//         message: "Registration failed YOU DUMB ASS!!!!",
// 		//     });
// 	} catch {}
// });

// // Update a user by ID
// router.put("/users/:id", async (req, res) => {
// 	try {
// 		const updatedUser = await User.findByIdAndUpdate(
// 			req.params.id,
// 			req.body,
// 			{
// 				new: true,
// 			}
// 		);
// 		res.json(updatedUser);
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// });

// // Delete a user by ID
// router.delete("/users/:id", async (req, res) => {
// 	try {
// 		await User.findByIdAndRemove(req.params.id);
// 		res.json({ message: "User deleted" });
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// });

module.exports = router;
