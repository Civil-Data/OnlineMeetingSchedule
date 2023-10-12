const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../utils/SecretToken");

// Insert one user in DB
module.exports.GetUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (!users) {
			return res.status(400).json({ message: "Could not find any users" });
		}
		res.json(users);
	} catch (error) {
		console.error("Could not find any users", error);
		res.status(400);
	}
};

// Update user information
module.exports.UpdateUser = async (req, res, next) => {
	try {
		const {
			newFirstName,
			newLastName,
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

		if (existingUser && emailChanged) {
			return res.json({ message: "User already exists" });
		}

		if (!newFirstName || !newLastName || !newEmail || !newPassword) {
			return res.json({
				message: "First Name, Last Name, Email and Password are required",
			});
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

		// Hash the password before saving it
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update the user's information in the database
		await User.updateOne(
			{ email: newEmail },
			{
				firstName: newFirstName,
				lastName: newLastName,
				gender: newGender,
				email: newEmail,
				telephone: newTelephone,
				age: newAge,
				description: newDescription,
				password: hashedPassword,
			}
		);

		const user = await User.findOne({ email: newEmail });

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
