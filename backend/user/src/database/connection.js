const mongoose = require("mongoose");
const { DB_URL } = require("../config/");

module.exports = async () => {
	try {
		await mongoose.connect(
			DB_URL ||
				"mongodb+srv://joel:leojsuiniracs123@cluster0.xevboqd.mongodb.net/",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		console.log("Db Connected");
	} catch (error) {
		console.error("Error ============ ON DB Connection");
		console.log(error);
	}
};
