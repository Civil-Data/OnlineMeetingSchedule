const mongoose = require("mongoose");

// Define a schema for the "User" model
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Your name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Your name is required"],
	},
	email: {
		type: String,
		required: [true, "Your email address is required"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Your password is required"],
	},
	salt: {
		type: String,
	},
	telephone: {
		type: String,
		default: "",
	},
	gender: {
		type: String,
		default: "",
	},
	description: {
		type: String,
		default: "The description of me should be here!",
	},
	age: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: `${new Date().toLocaleDateString(
			"sv-SE"
		)} ${new Date().toLocaleTimeString("sv-SE")}`,
	},
});
module.exports = mongoose.model("User", userSchema);
