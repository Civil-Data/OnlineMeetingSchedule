const UserService = require("../services/user-service");
const { SubscribeMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
	const service = new UserService();

	// To listen
	SubscribeMessage(channel, service);

	// Sign up user
	app.post("/signup", async (req, res, next) => {
		try {
			const userInput = req.body;
			const { user, token } = await service.SignUp(userInput);
			// Send a success response with user information
			res.status(201).json({
				message: `${user.firstName} signed in!`,
				user,
				token,
			});
		} catch (error) {
			next(error);
		}
	});

	// Login a user
	app.post("/login", async (req, res, next) => {
		try {
			const { email, password } = req.body;
			const { existingUser, token } = await service.LogIn({ email, password });
			res.json({ existingUser, token });
		} catch (error) {
			next(error);
		}
	});

	// get all users
	app.get("/users", UserAuth, async (req, res, next) => {
		try {
			const existingUsers = await service.GetUsers();
			res.json(existingUsers);
		} catch (error) {
			next(error);
		}
	});

	// get user
	app.get("/:userId", UserAuth, async (req, res, next) => {
		try {
			const userId = req.params.userId;
			const user = await service.GetUser(userId);
			res.json(user);
		} catch (error) {
			next(error);
		}
	});

	// update user
	app.post("/update", UserAuth, async (req, res, next) => {
		try {
			const userInput = req.body;
			const user = await service.UpdateUser(userInput);
			res.json(user);
		} catch (error) {
			next(error);
		}
	});

	// //validate token
	// app.post("/", async (req, res, next) => {
	// 	try {
	// 		const userInput = req.body;
	// 		const { data } = await service.ValidateToken(userInput);
	// 		res.json(data);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// });
};
