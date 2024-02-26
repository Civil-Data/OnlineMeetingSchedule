const { UserRepository } = require("../database");
const {
	GeneratePassword,
	GenerateSalt,
	GenerateSignature,
	ValidatePassword,
	ValidateUserInput,
} = require("../utils");
const { APIError, NotFoundError, ValidationError } = require("../utils/error/app-errors");

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
		if (!validPassword) throw new ValidationError("Incorrect email or password.");

		const token = await GenerateSignature({
			email: existingUser.email,
			_id: existingUser._id,
		});

		return { existingUser, token };
	}

	async SignUp({ firstName, lastName, email, password }) {
		const existingUser = await this.repository.FindUser(email);

		if (existingUser)
			throw new ValidationError("A user with this email already exist. Try to log in.");

		await ValidateUserInput("SIGNUP", {
			newFirstName: firstName,
			newLastName: lastName,
			newEmail: email,
			newPassword: password,
		});

		// Create salt
		const salt = await GenerateSalt();
		const newUserPassword = await GeneratePassword(password, salt);

		const user = await this.repository.CreateUser({
			firstName,
			lastName,
			email,
			password: newUserPassword,
			salt,
		});

		const token = await GenerateSignature({
			email: email,
			_id: user._id,
		});

		if (!user) throw new APIError("Something went wrong during user sign up.");
		if (!token) throw new APIError("Unable to generate JSON web token.");

		return { user, token };
	}

	async UpdateUser({
		newId,
		newFirstName,
		newLastName,
		newEmail,
		newPassword,
		newDescription,
		newAge,
		newGender,
		newTelephone,
		emailChanged,
	}) {
		await ValidateUserInput("UPDATE", {
			newFirstName,
			newLastName,
			newEmail,
			newPassword,
			newAge,
			newGender,
			newTelephone,
		});

		const salt = await GenerateSalt();
		const userPassword = await GeneratePassword(newPassword, salt);

		const existingUser = await this.repository.UpdateUserById({
			newId,
			newFirstName,
			newLastName,
			newEmail,
			newPassword: userPassword,
			salt,
			newDescription,
			newAge,
			newGender,
			newTelephone,
			emailChanged,
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
	async GetUser(id) {
		const existingUser = await this.repository.GetUserById(id);
		if (!existingUser) throw new NotFoundError("No user found.");
		return existingUser;
	}

	// //get user
	// async AuthStatus(token) {
	// 	const existingUser = await ValidatePassword();
	// 	if (!existingUser) throw new NotFoundError("No user found.");
	// 	return existingUser;
	// }
}

module.exports = UserService;
