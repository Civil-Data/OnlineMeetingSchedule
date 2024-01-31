const { UserRepository } = require("../database");
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
		return FormateData({ id: existingUser._id, token });
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

	// async SubscribeEvents(payload){

	// 	console.log("Triggering.... User Events");

	// 	payload = JSON.parse(payload);

	// 	const { event, data } =  payload;

	// 	const { userId} = data;

	// 	switch(event){
	// 	case "Login":
	// 		break;
	// 	case "Register":
	// 		break;
	// 	default:
	// 		break;
	// 	}

	// }
}

module.exports = UserService;
