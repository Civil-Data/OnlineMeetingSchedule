const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../config/");

// Define a function to create a secret token for a user
module.exports.createSecretToken = (id) => {
	return jwt.sign({ id }, TOKEN_KEY, {
		expiresIn: 3 * 24 * 60 * 60,
	});
};
