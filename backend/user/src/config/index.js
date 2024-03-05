const dotEnv = require("dotenv");

if (process.env.NODE_ENV === "dev") {
	const configFile = `./.env.${process.env.NODE_ENV}`;

	dotEnv.config({ path: configFile });
} else if (process.env.NODE_ENV === "prod") {
	const configFile = `./.env.${process.env.NODE_ENV}`;

	dotEnv.config({ path: configFile });
} else {
	dotEnv.config();
}

module.exports = {
	PORT: process.env.PORT,
	DB_URL: process.env.MONGODB_URI,
	APP_SECRET: process.env.APP_SECRET,
	EXCHANGE_NAME: process.env.EXCHANGE_NAME,
	MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
	TOKEN_KEY: process.env.TOKEN_KEY,
	USER_SERVICE: "user_service",
	MEETING_SERVICE: "meeting_service",
};
