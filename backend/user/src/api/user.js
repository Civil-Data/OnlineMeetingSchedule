const UserService = require("../services/user-service");
const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
	const service = new UserService();

	// To listen
	SubscribeMessage(channel, service);

	app.post("/register", async (req, res) => {
		// try {
		const { firstName, lastName, email, password } = req.body;
		// const existingUser = await User.findOne({ email });
		const { data } = await service.Register({
			email,
			password,
			firstName,
			lastName,
		});
		res.json(data);
	});
	// Login a user
	app.post("/login", async (req, res) => {
		// try {
		// Extract email and password from the request body
		const { email, password } = req.body;
		const { data } = await service.LogIn({ email, password });
		res.json(data);
	});

	// get all users
	app.get("/users", async (req, res) => {
		const { data } = await service.GetUsers();
		res.json(data);
	});

	// update user
	app.post("/updateUser", async (req, res) => {
		const { data } = await service.UpdateUser(req.body);
		res.json(data);
	});
};
