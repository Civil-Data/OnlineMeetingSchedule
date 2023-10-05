const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

// Insert one user in DB
module.exports.GetUsers = async (req, res) => {
	try {
		console.log(req.body);
		console.log(res);
		// const { email } = req.body;

		// Check if the username or email is already in use
		const users = await User.find();
		if (!users) {
			return res.status(400).json({ message: "Email is already in use" });
		}
		res.json(users);
	} catch (error) {
		console.error("Could not find any users", error);
		res.status(400);
	}
};

// Insert one user in DB
module.exports.InsertOneUser = async (req, res) => {
	try {
		console.log(req.body);
		console.log(res);
		const { email } = req.body;

		// Check if the username or email is already in use
		const existingUser = await User.findOne({
			email: email,
		});
		if (existingUser) {
			return res.status(400).json({ message: "Email is already in use" });
		}
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({
			message: "Registration failed YOU DUMB ASS!!!!",
		});

		// Hash the password before saving it
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user document
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
	}
};
