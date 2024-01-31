const UserService = require("../services/user-service");
// const UserAuth = require("./middlewares/auth");
const { SubscribeMessage } = require("../utils");
// const User = require("../models/user.model");
// const { createSecretToken } = require("../utils/SecretToken");
// const bcrypt = require("bcryptjs");
// const { isEmail, isAlpha } = require("validator");

module.exports = (app, channel) => {
	const service = new UserService();

	// To listen
	SubscribeMessage(channel, service);

	// app.get("/profile", UserAuth, async (req, res, next) => {
	// 	const { _id } = req.user;
	// 	const { data } = await service.GetProfile({ _id });
	// 	res.json(data);
	// });

	// app.get("/whoami", (req, res, next) => {
	// 	return res.status(200).json({ msg: "/user : I am user Service" });
	// });

	// app.get("/profile", UserAuth, async (req, res, next) => {
	// 	const { _id } = req.user;
	// 	const { data } = await service.GetProfile({ _id });
	// 	res.json(data);
	// });

	app.post("/register", async (req, res) => {
		// try {
		const { firstName, lastName, email, password } = req.body;
		// const existingUser = await User.findOne({ email });
		const { data } = await service.Register({
			email,
			password,
			firstName,
			lastName,
		});
		res.json(data);

		// 	if (existingUser) {
		// 		return res.json({ message: "User already exists" });
		// 	}

		// 	// Check if all required fields are provided
		// 	if (!firstName || !lastName || !email || !password) {
		// 		return res.json({ message: "All fields are required" });
		// 	}

		// 	// Check if the first name and last name are letters
		// 	if (!isAlpha(firstName) || !isAlpha(lastName)) {
		// 		return res.json({
		// 			message: "First name and last name should be letters",
		// 		});
		// 	}

		// 	// Check if the password meets the minimum length requirement
		// 	if (password.length < 8) {
		// 		return res.json({
		// 			message: "Password should be at least 8 characters",
		// 		});
		// 	}

		// 	// Create a new user in the database
		// 	const user = await User.create({
		// 		firstName,
		// 		lastName,
		// 		email,
		// 		password,
		// 	});

		// 	// Check if the email format is valid
		// 	if (!isEmail(email)) {
		// 		return res.json({
		// 			message: "Email is not valid",
		// 		});
		// 	}

		// 	// Generate a secret token for the user's session
		// 	const token = createSecretToken(user._id);

		// 	// Set the token in a cookie for future authentication
		// 	res.cookie("token", token, {
		// 		withCredentials: true,
		// 		httpOnly: false,
		// 	});

		// 	// Send a success response with user information
		// 	res.status(201).json({
		// 		message: "User signed in successfully",
		// 		success: true,
		// 		user,
		// 	});

		// 	next();
		// } catch (error) {
		// 	console.error(error);
		// }
	});
	// Login a user
	app.post("/login", async (req, res) => {
		// try {
		// Extract email and password from the request body
		const { email, password } = req.body;
		const { data } = await service.LogIn({ email, password });
		res.json(data);
		// Check if both email and password are provided
		// 	if (!email || !password) {
		// 		return res.json({ message: "All fields are required" });
		// 	}

		// 	const user = await User.findOne({ email });

		// 	if (!user) {
		// 		return res.json({ message: "Incorrect password or email" });
		// 	}

		// 	// Compare the provided password with the hashed password in the database
		// 	const auth = await bcrypt.compare(password, user.password);

		// 	if (!auth) {
		// 		return res.json({ message: "Incorrect password or email" });
		// 	}

		// 	const token = createSecretToken(user._id);

		// 	// Set the token in a cookie for future authentication
		// 	res.cookie("token", token, {
		// 		withCredentials: true,
		// 		httpOnly: false,
		// 	});

		// 	res.status(201).json({
		// 		message: "User logged in successfully",
		// 		success: true,
		// 		user,
		// 	});
		// 	next();
		// } catch (error) {
		// 	console.error(error);
		// }
	});

	// get all users
	app.get("/users", async (req, res) => {
		const { data } = await service.GetUsers();
		res.json(data);
	});

	// update user
	app.post("/updateUser", async (req, res) => {
		const { data } = await service.UpdateUser(req.body);
		res.json(data);
	});

	// // Insert one user in DB
	// module.exports.GetUsers = async (req, res) => {
	// 	try {
	// 		const users = await User.find();
	// 		if (!users) {
	// 			return res
	// 				.status(400)
	// 				.json({ message: "Could not find any users" });
	// 		}
	// 		res.json(users);
	// 	} catch (error) {
	// 		console.error("Could not find any users", error);
	// 		res.status(400);
	// 	}
	// };

	// Update user information
	// module.exports.UpdateUser = async (req, res, next) => {
	// 	try {
	// 		const {
	// 			newFirstName,
	// 			newLastName,
	// 			newGender,
	// 			newEmail,
	// 			newTelephone,
	// 			newAge,
	// 			newDescription,
	// 			newPassword,
	// 			emailChanged,
	// 		} = req.body;

	// 		// Check if a user with the new email already exists (if email is changed)
	// 		const existingUser = await User.findOne({ email: newEmail });

	// 		if (existingUser && emailChanged) {
	// 			return res.json({ message: "User already exists" });
	// 		}

	// 		if (!newFirstName || !newLastName || !newEmail || !newPassword) {
	// 			return res.json({
	// 				message:
	// 					"First Name, Last Name, Email and Password are required",
	// 			});
	// 		}

	// 		// Check if the new password meets the minimum length requirement
	// 		if (newPassword.length < 8) {
	// 			return res.json({
	// 				message: "Password should be at least 8 characters",
	// 			});
	// 		}

	// 		// Check if the new email format is valid
	// 		if (!newEmail.includes("@")) {
	// 			return res.json({ message: "Email is not valid" });
	// 		}

	// 		// Hash the password before saving it
	// 		const hashedPassword = await bcrypt.hash(newPassword, 10);

	// 		// Update the user's information in the database
	// 		await User.updateOne(
	// 			{ email: newEmail },
	// 			{
	// 				firstName: newFirstName,
	// 				lastName: newLastName,
	// 				gender: newGender,
	// 				email: newEmail,
	// 				telephone: newTelephone,
	// 				age: newAge,
	// 				description: newDescription,
	// 				password: hashedPassword,
	// 			}
	// 		);

	// 		const user = await User.findOne({ email: newEmail });

	// 		// Generate a secret token for the user's session
	// 		const token = createSecretToken(user._id);
	// 		res.cookie("token", token, {
	// 			withCredentials: true,
	// 			httpOnly: false,
	// 		});

	// 		// Send a success response with the updated user data
	// 		res.status(201).json({
	// 			message: "User updated successfully",
	// 			success: true,
	// 			user,
	// 		});
	// 		next();
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
};
