const mongoose = require("mongoose");
const { DB_URL } = require("../config");

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB Connection Success"))
	.catch((err) => {
		console.log("Error ============ ON DB Connection");
		console.error(err);
	});
