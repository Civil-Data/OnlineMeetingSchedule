const Sentry = require("@sentry/node");

const _ = require("@sentry/tracing");

const {
	NotFoundError,
	ValidationError,
	AuthenticationError,
} = require("./app-errors");

Sentry.init({
	dsn: "YOUR_SENTRY_DNS_KEY_FROM_INTEGRATION_PAGE",

	tracesSampleRate: 1.0,
});

module.exports = (app) => {
	app.use((error, req, res, next) => {
		let reportError = true;

		// skip common / known errors

		[NotFoundError, ValidationError, AuthenticationError].forEach(
			(typeOfError) => {
				if (error instanceof typeOfError) {
					reportError = false;
				}
			}
		);

		if (reportError) {
			Sentry.captureException(error);
		}

		const statusCode = error.statusCode || 500;
		const data = error.data || error.message;
		return res.status(statusCode).json(data);
	});
};
