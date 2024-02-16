const { UserRepository } = require("../database");
const { createSecretToken } = require("../utils/secretToken");
const { TOKEN_KEY } = require("../config/");
const jwt = require("jsonwebtoken");
const {
	FormateData,
	GeneratePassword,
	GenerateSalt,
	GenerateSignature,
	ValidatePassword,
} = require("../utils");

// All Business logic will be here
class UserService {
	constructor() {
		this.repository = new UserRepository();
	}

	async LogIn(userInputs) {
		const { email, password } = userInputs;

		const existingUser = await this.repository.FindUser({ email });

		if (existingUser) {
			const validPassword = await ValidatePassword(
				password,
				existingUser.password,
				existingUser.salt
			);
			if (validPassword) {
				const token = await GenerateSignature({
					email: existingUser.email,
					_id: existingUser._id,
				});
				return FormateData({ id: existingUser._id, token });
			}
		}

		return FormateData(null);
	}

	async Register(userInputs) {
		const { email, password, firstName, lastName } = userInputs;

		// create salt
		let salt = await GenerateSalt();

		let userPassword = await GeneratePassword(password, salt);

		const existingUser = await this.repository.CreateUser({
			email,
			password: userPassword,
			firstName,
			lastName,
			salt,
		});

		const token = await GenerateSignature({
			email: email,
			_id: existingUser._id,
		});
		const cookieToken = createSecretToken(existingUser._id);
		return FormateData({ id: existingUser._id, token, cookieToken });
	}

	async UpdateUser(userInputs) {
		const { id, firstName, lastName, email, password } = userInputs;

		let salt = await GenerateSalt();

		let userPassword = await GeneratePassword(password, salt);

		const existingUser = await this.repository.UpdateUserById({
			id,
			firstName,
			lastName,
			email,
			password: userPassword,
			salt,
		});

		return FormateData(existingUser);
	}

	//get all users
	async GetUsers() {
		const existingUsers = await this.repository.GetUsers();

		return FormateData(existingUsers);
	}

	//get user
	async GetUser(userInputs) {
		const { id } = userInputs;

		const existingUser = await this.repository.GetUserById({ id });
		return FormateData(existingUser);
	}
	//validate token
	async ValidateToken(req) {
		const token = req.cookie.token;

		// Verify the token using the secret key from environment variables
		jwt.verify(token, TOKEN_KEY, async (data) => {
			const existingUser = await this.repository.GetUserById(data.id);

			return FormateData(existingUser);
		});
	}
}

module.exports = UserService;
