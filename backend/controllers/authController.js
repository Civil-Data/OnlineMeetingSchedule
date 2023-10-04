const User = require("../models/user.model");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Register = async (req, res, next) => {
	try {
		const { name, email, password, createdAt } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({ message: "User already exists" });
		}
		const user = await User.create({
			name,
			email,
			password,
			createdAt,
		});

		//const allUsers = await User.find();

		// Add the new user to the contact lists of all existing users
		// allUsers.forEach(async (existingUser) => {
		// 	existingUser.contacts.push(user._id);
		// 	await existingUser.save();
		// });
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
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

module.exports.Login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.json({ message: "All fields are required" });
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ message: "Incorrect password or email" });
		}
		const auth = await bcrypt.compare(password, user.password);
		if (!auth) {
			return res.json({ message: "Incorrect password or email" });
		}
		const token = createSecretToken(user._id);
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});
		res.status(201).json({
			message: "User logged in successfully",
			success: true,
		});
		next();
	} catch (error) {
		console.error(error);
	}
};
