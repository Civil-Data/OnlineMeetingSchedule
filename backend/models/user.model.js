const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
	telephone: {
		type: Number,
		default: 46700000000,
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
		default: `${new Date().toLocaleDateString("sv-SE")} ${new Date().toLocaleTimeString(
			"sv-SE"
		)}`,
	},
});

userSchema.pre("save", async function () {
	this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
