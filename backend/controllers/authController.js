// Import necessary modules and functions
const User = require("../models/user.model");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const { isEmail, isAlpha } = require("validator");

// Register a new user
module.exports.Register = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.json({ message: "User already exists" });
		}

		// Check if all required fields are provided
		if (!firstName || !lastName || !email || !password) {
			return res.json({ message: "All fields are required" });
		}

		// Check if the first name and last name are letters
		if (!isAlpha(firstName) || !isAlpha(lastName)) {
			return res.json({
				message: "First name and last name should be letters",
			});
		}

		// Check if the password meets the minimum length requirement
		if (password.length < 8) {
			return res.json({
				message: "Password should be at least 8 characters",
			});
		}

		// Create a new user in the database
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
		});

		// Check if the email format is valid
		if (!isEmail(email)) {
			return res.json({
				message: "Email is not valid",
			});
		}

		// Generate a secret token for the user's session
		const token = createSecretToken(user._id);

		// Set the token in a cookie for future authentication
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});

		// Send a success response with user information
		res.status(201).json({
			message: "User signed in successfully",
			success: true,
			user,
		});

		next();
	} catch (error) {
		console.error(error);
	}
};

// Login a user
module.exports.Login = async (req, res, next) => {
	try {
		// Extract email and password from the request body
		const { email, password } = req.body;

		// Check if both email and password are provided
		if (!email || !password) {
			return res.json({ message: "All fields are required" });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.json({ message: "Incorrect password or email" });
		}

		// Compare the provided password with the hashed password in the database
		const auth = await bcrypt.compare(password, user.password);

		if (!auth) {
			return res.json({ message: "Incorrect password or email" });
		}

		const token = createSecretToken(user._id);

		// Set the token in a cookie for future authentication
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});

		res.status(201).json({
			message: "User logged in successfully",
			success: true,
			user,
		});
		next();
	} catch (error) {
		console.error(error);
	}
};
