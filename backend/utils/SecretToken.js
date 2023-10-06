require("dotenv").config();
const jwt = require("jsonwebtoken");

// Define a function to create a secret token for a user
module.exports.createSecretToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_KEY, {
		expiresIn: 3 * 24 * 60 * 60,
	});
};
