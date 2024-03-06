const { ValidateSignature } = require("../../utils");
const { AuthenticationError } = require("../../utils/error/app-errors");

module.exports = async (req, res, next) => {
	try {
		const isAuthorized = await ValidateSignature(req);

		if (!isAuthorized) throw new AuthenticationError("Not authorized.");

		next();
	} catch (error) {
		next(error);
	}
};
