const { UserRepository } = require("../database");
// const { createSecretToken } = require("../utils/secretToken");
const { TOKEN_KEY } = require("../config/");
const jwt = require("jsonwebtoken");
const {
	FormateData,
	GeneratePassword,
	GenerateSalt,
	GenerateSignature,
	ValidatePassword,
	ValidateUserInput,
} = require("../utils");
const { APIError, NotFoundError, ValidationError } = require("../utils/error/app-errors");

// All Business logic will be here
class UserService {
	constructor() {
		this.repository = new UserRepository();
	}

	async LogIn({ email, password }) {
		const existingUser = await this.repository.FindUser(email);

		if (!existingUser) throw new NotFoundError("User not found.");

		const validPassword = await ValidatePassword(
			password,
			existingUser.password,
			existingUser.salt
		);
		if (!validPassword) throw new ValidationError("Passwords do not match.");

		const token = await GenerateSignature({
			email: existingUser.email,
			_id: existingUser._id,
		});

		return { existingUser, token };
	}

	async SignUp({ firstName, lastName, email, password }) {
		const existingUser = await this.repository.FindUser(email);

		if (existingUser)
			throw new APIError("A user with this email already exist. Try to log in.");

		await ValidateUserInput("SIGNUP", { firstName, lastName, email, password });

		// Create salt
		const salt = await GenerateSalt();
		const userPassword = await GeneratePassword(password, salt);

		const user = await this.repository.CreateUser({
			firstName,
			lastName,
			email,
			password: userPassword,
			salt,
		});

		const token = await GenerateSignature({
			email: email,
			_id: user._id,
		});

		return { user, token };
	}

	async UpdateUser({
		id,
		firstName,
		lastName,
		email,
		password,
		telephone,
		gender,
		description,
		age,
	}) {
		await ValidateUserInput("UPDATE", {
			firstName,
			lastName,
			email,
			password,
			telephone,
			gender,
			description,
			age,
		});

		const salt = await GenerateSalt();
		const userPassword = await GeneratePassword(password, salt);

		const existingUser = await this.repository.UpdateUserById({
			id,
			firstName,
			lastName,
			email,
			password: userPassword,
			salt,
		});

		return existingUser;
	}

	//get all users
	async GetUsers() {
		const existingUsers = await this.repository.GetUsers();
		if (!existingUsers) throw new NotFoundError("No users found.");

		return existingUsers;
	}

	//get user
	async GetUser({ id }) {
		const existingUser = await this.repository.GetUserById(id);
		if (!existingUser) throw new NotFoundError("No user found.");
		return existingUser;
	}

	//validate token
	async ValidateToken(req) {
		const token = req.cookie.token;

		// Verify the token using the secret key from environment variables
		jwt.verify(token, TOKEN_KEY, async data => {
			const existingUser = await this.repository.GetUserById(data.id);

			return existingUser;
		});
	}
}

module.exports = UserService;
