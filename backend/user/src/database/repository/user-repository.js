// const mongoose = require("mongoose");
const { UserModel } = require("../models");

//Dealing with data base operations
class UserRepository {
	async CreateUser({ firstName, lastName, email, password, salt }) {
		const user = new UserModel({
			firstName,
			lastName,
			email,
			password,
			salt,
		});

		return await user.save();
	}

	async FindUser(email) {
		const existingUser = await UserModel.findOne({ email: email });
		return existingUser;
	}

	//update user by id
	async UpdateUserById({
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
		const existingUser = await UserModel.findByIdAndUpdate(
			id,
			{
				firstName,
				lastName,
				email,
				password,
				telephone,
				gender,
				description,
				age,
			},
			{ new: true }
		);

		return existingUser;
	}

	// get all users
	async GetUsers() {
		const existingUsers = await UserModel.find();
		return existingUsers;
	}

	// get user by id
	async GetUserById(id) {
		const existingUser = await UserModel.findById(id);
		return existingUser;
	}
}

module.exports = UserRepository;
