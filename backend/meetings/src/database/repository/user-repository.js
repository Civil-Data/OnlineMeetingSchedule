const mongoose = require("mongoose");
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

		const userResult = await user.save();
		return userResult;
	}

	async FindUser({ email }) {
		const existingUser = await UserModel.findOne({ email: email });
		return existingUser;
	}

	async FindUserById({ id }) {
		const existingUser = await UserModel.findById(id).populate("address");

		return existingUser;
	}
}

module.exports = UserRepository;
