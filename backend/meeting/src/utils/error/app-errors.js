const STATUS_CODES = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 403,
	NOT_FOUND: 404,
	INTERNAL_ERROR: 500,
};

class BaseError extends Error {
	constructor(name, statusCode, description) {
		super(description);
		Object.setPrototypeOf(this, new.target.prototype);
		this.name = name;
		this.statusCode = statusCode;
		Error.captureStackTrace(this);
	}
}

// 500 Internal Error
class APIError extends BaseError {
	constructor(description = "Api error") {
		super(
			"Api internal server error",
			STATUS_CODES.INTERNAL_ERROR,
			description
		);
	}
}

// 400 Validation Error
class ValidationError extends BaseError {
	constructor(description = "Bad request") {
		super("Bad request", STATUS_CODES.BAD_REQUEST, description);
	}
}

// 403 Authorize error
class AuthenticationError extends BaseError {
	constructor(description = "Access denied") {
		super("Access denied", STATUS_CODES.UNAUTHORISED, description);
	}
}

// 404 Not Found
class NotFoundError extends BaseError {
	constructor(description = "Not found") {
		super("Not found", STATUS_CODES.NOT_FOUND, description);
	}
}

module.exports = {
	APIError,
	ValidationError,
	AuthenticationError,
	NotFoundError,
};
