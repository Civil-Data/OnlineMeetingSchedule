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
		newId,
		newFirstName,
		newLastName,
		newEmail,
		password,
		newTelephone,
		newGender,
		newDescription,
		newAge,
	}) {
		const existingUser = await UserModel.findByIdAndUpdate(
			newId,
			{
				firstName: newFirstName,
				lastName: newLastName,
				email: newEmail,
				password: password,
				telephone: newTelephone,
				gender: newGender,
				description: newDescription,
				age: newAge,
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
