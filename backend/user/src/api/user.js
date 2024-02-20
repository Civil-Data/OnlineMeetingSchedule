const UserService = require("../services/user-service");
const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
	const service = new UserService();

	// To listen
	SubscribeMessage(channel, service);

	app.post("/register", async (req, res, next) => {
		try {
			const userInput = req.body;
			const { user, token } = await service.Register(userInput);
			// Send a success response with user information
			res.status(201).json({
				message: "User signed in successfully",
				user,
				token,
			});
		} catch (error) {
			next(error);
		}
	});
	// Login a user
	app.post("/login", async (req, res) => {
		try {
			// Extract email and password from the request body
			const { email, password } = req.body;
			const { data } = await service.LogIn({ email, password });
			res.json(data);
		} catch (error) {
			res.json(error);
		}
	});

	// get all users
	app.get("/users", async (req, res) => {
		const { data } = await service.GetUsers();
		res.json(data);
	});

	// get user
	app.get("/user", async (req, res) => {
		const { data } = await service.GetUser(req.body);
		res.json(data);
	});

	// update user
	app.post("/updateUser", async (req, res) => {
		const user = await service.UpdateUser(req.body);
		res.json(user);
	});

	//validate token
	app.post("/", async (req, res) => {
		const { data } = await service.ValidateToken(req.body);
		res.json(data);
	});
};
