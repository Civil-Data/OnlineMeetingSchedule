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

	async LogIn({ email, password }) {
		const existingUser = await this.repository.FindUser(email);

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

	async Register({ email, password, firstName, lastName }) {
		// const { email, password, firstName, lastName } = userInputs;

		const existingUser = await this.repository.FindUser(email);

		if (existingUser) {
            throw new 
			return res.json({ message: "User already exists" });
		}

		// Check if all required fields are provided
		if (!firstName || !lastName || !email || !password) {
			return res.json({ message: "All fields are required" });
		}

		// Check if the first name and last name are letters
		if (!isAlpha(firstName) || !isAlpha(lastName)) {
			return res.json({
				message: "First name and last name should be letters",
			});
		}

		// Check if the password meets the minimum length requirement
		if (password.length < 8) {
			return res.json({
				message: "Password should be at least 8 characters",
			});
		}

		// Create a new user in the database
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
		});

		// Check if the email format is valid
		if (!isEmail(email)) {
			return res.json({
				message: "Email is not valid",
			});
		}

		// Generate a secret token for the user's session
		const token = createSecretToken(user._id);

		// Set the token in a cookie for future authentication
		res.cookie("token", token, {
			withCredentials: true,
			httpOnly: false,
		});

		// Send a success response with user information
		res.status(201).json({
			message: "User signed in successfully",
			success: true,
			user,
		});

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

	async UpdateUser({ id, firstName, lastName, email, password }) {
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
		jwt.verify(token, TOKEN_KEY, async data => {
			const existingUser = await this.repository.GetUserById(data.id);

			return FormateData(existingUser);
		});
	}
}

module.exports = UserService;
