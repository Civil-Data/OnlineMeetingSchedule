const UserService = require("../services/user-service");

module.exports = (app) => {
	const service = new UserService();
	app.use("/app-events", async (req, res) => {
		const { payload } = req.body;

		//handle subscribe events
		service.SubscribeEvents(payload);

		console.log("============= Logging in ================");
		console.log(payload);
		res.json(payload);
	});
};
