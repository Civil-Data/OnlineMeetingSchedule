const User = require("../models/user.model");
// const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../utils/SecretToken");

// Insert one user in DB
module.exports.GetUsers = async (req, res) => {
	try {
		const users = await User.find();
		// console.log(users);
		if (!users) {
			return res.status(400).json({ message: "Could not find any users" });
		}
		res.status(200).json(users);
	} catch (error) {
		console.error("Could not find any users", error);
		res.status(400);
	}
};

// Update user information
module.exports.UpdateUser = async (req, res, next) => {
	console.log(req.body);
	try {
		// Extract user information from the request body
		const {
			newName,
			newGender,
			newEmail,
			newTelephone,
			newAge,
			newDescription,
			newPassword,
			emailChanged,
		} = req.body;

		// Check if a user with the new email already exists (if email is changed)
		const existingUser = await User.findOne({ email: newEmail });
		console.log(existingUser);
		if (existingUser && emailChanged) {
			return res.json({ message: "User already exists" });
		}

		// Check if all required fields are provided
		if (!newName || !newEmail || !newPassword) {
			return res.json({ message: "All fields are required" });
		}

		// Check if the new password meets the minimum length requirement
		if (newPassword.length < 8) {
			return res.json({
				message: "Password should be at least 8 characters",
			});
		}

		// Check if the new email format is valid
		if (!newEmail.includes("@")) {
			return res.json({ message: "Email is not valid" });
		}

		// Update the user's information in the database
		const apa = await User.updateOne(
			{ email: newEmail },
			{
				name: newName,
				gender: newGender,
				email: newEmail,
				telephone: newTelephone,
				age: newAge,
				description: newDescription,
				password: newPassword,
			}
		);
		console.log(apa);

		// Find the updated user's information
		const user = await User.findOne({ email: newEmail });
		console.log(user);

		// Generate a secret token for the user's session
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});

		// Send a success response with the updated user data
		res.status(201).json({
			message: "User updated successfully",
			success: true,
			user,
		});
		next();
	} catch (error) {
		console.error(error);
	}
};
