import axios from "axios";
import { SERVER_URL } from "../config";

// api.defaults.baseURL = "http://localhost:8000/";

export const getAuthToken = () => {
	const token = localStorage.getItem("token");
	if (token) {
		return token;
	}
};

class APIHandler {
	constructor() {
		// this.instance = new APIHandler();
		this.api = axios.create({
			baseURL: SERVER_URL,
			timeout: 5000,
			headers: {
				// "Content-Type": "application/json",
				// post: "application/json",
				common: {
					setContentEncoding: "application/json",
					Authorization: getAuthToken(),
				},
			},
		});
	}

	async GetData(endPoint, options) {
		try {
			const response = await this.api.get(endPoint);
			return response;
		} catch (err) {
			throw err;
		}
	}

	async PostData(endPoint, options) {
		try {
			const response = await this.api.post(endPoint, options);
			return response;
		} catch (err) {
			throw err;
		}
	}

	async PutData(endPoint, options) {
		try {
			const response = await this.api.put(endPoint, options);
			return response;
		} catch (err) {
			throw err;
		}
	}

	async DeleteData(endPoint) {
		try {
			const response = await this.api.delete(endPoint);
			return response;
		} catch (err) {
			throw err;
		}
	}
}

export default APIHandler;

// export const GetData = async (endPoint, options) => {
// 	try {
// 		setHeader();
// 		const response = await api.get(endPoint);
// 		return response;
// 	} catch (err) {
// 		throw err;
// 	}
// };

// export const PostData = async (endPoint, options) => {
// 	try {
// 		setHeader();
// 		const response = await api.post(endPoint, options);
// 		return response;
// 	} catch (err) {
// 		throw err;
// 	}
// };

// export const PutData = async (endPoint, options) => {
// 	try {
// 		setHeader();
// 		const response = await api.put(endPoint, options);
// 		return response;
// 	} catch (err) {
// 		throw err;
// 	}
// };

// export const DeleteData = async endPoint => {
// 	try {
// 		setHeader();
// 		const response = await api.delete(endPoint);
// 		return response;
// 	} catch (err) {
// 		throw err;
// 	}
// };
