import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import { SERVER_URL } from "../config/index";
import { useUpdateUserContext } from "../contexts/LoginContext";
import { isAlpha, isEmail } from "validator";
import APIHandler from "../utils/api-methods";
import { useToastUpdate } from "../contexts/PageContext";

const api = new APIHandler();

//Component for signup
const Signup = () => {
	const navigate = useNavigate();
	const { sendToastSuccess, sendToastError } = useToastUpdate();

	const [inputValue, setInputValue] = useState({
		firstName: "",
		lastName: "",
		email: "",
		confirmEmail: "",
		password: "",
		confirmPassword: "",
	});
	const { firstName, lastName, email, confirmEmail, password, confirmPassword } = inputValue;
	const { saveUser, updateLoginStatus, setJustSignedUp, setAuthToken } = useUpdateUserContext();

	const handleOnChange = e => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	//Handle all inputs from user
	const handleSubmit = async e => {
		e.preventDefault();

		if (!isAlpha(firstName) || !isAlpha(lastName)) {
			return sendToastError("First name and last name should be letters");
		}

		if (email !== confirmEmail) {
			return sendToastError("Emails do not match");
		}

		if (password !== confirmPassword) {
			return sendToastError("Passwords do not match");
		}

		if (!firstName || !lastName || !email || !password || !confirmEmail || !confirmPassword) {
			return sendToastError("All fields are required");
		}

		if (password.length < 8) {
			return sendToastError("Password should be at least 8 characters");
		}

		if (!isEmail(email)) {
			return sendToastError("Email is not valid");
		}

		try {
			console.log(firstName, lastName, email, password);
			const { data } = await api.PostData(
				"/user/signup",
				{ firstName, lastName, email, password },
				{ withCredentials: true }
			);
			// Set the token in local storage
			await setAuthToken(data.token);
			sendToastSuccess(data.message);
			// updateLoginStatus(true);
			setJustSignedUp(true);
			saveUser(data.user);
			setTimeout(() => {
				navigate("/profile");
			}, 2000);
		} catch (error) {
			console.error(error);
			sendToastError(error.response.data);
		}
		setInputValue({
			...inputValue,
			password: "",
			confirmPassword: "",
		});
	};

	return (
		<form onSubmit={handleSubmit} className="form_container">
			<div>
				<label htmlFor="name" className="input_label">
					Enter your first name
					<b>*</b>
				</label>
			</div>
			<input
				className="input_margin"
				type="text"
				name="firstName"
				placeholder="FirstName"
				autoComplete="firstName"
				value={firstName}
				onChange={handleOnChange}
			/>
			<div>
				<label htmlFor="name" className="input_label">
					Enter your last name
					<b>*</b>
				</label>
			</div>
			<input
				className="input_margin"
				type="text"
				name="lastName"
				placeholder="LastName"
				autoComplete="lastName"
				value={lastName}
				onChange={handleOnChange}
			/>
			<div>
				<label htmlFor="email" className="input_label">
					Enter your email
					<b>*</b>
				</label>
			</div>
			<input
				className="input_margin"
				type="email"
				name="email"
				placeholder="Email"
				autoComplete="Email"
				value={email}
				onChange={handleOnChange}
			/>
			<div>
				<label htmlFor="Confirm email" className="input_label">
					Confirm your email
					<b>*</b>
				</label>
			</div>
			<input
				className="input_margin"
				type="email"
				name="confirmEmail"
				placeholder="Confirm email"
				autoComplete="Confirm email"
				value={confirmEmail}
				onChange={handleOnChange}
			/>
			<div>
				<label htmlFor="password" className="input_label">
					Enter your password
					<b>*</b>
				</label>
			</div>
			<input
				className="input_margin"
				type="password"
				name="password"
				placeholder="Password"
				autoComplete="Password"
				value={password}
				onChange={handleOnChange}
			/>
			<div>
				<label htmlFor="Confirm password" className="input_label">
					Confirm your password
					<b>*</b>
				</label>
			</div>

			<input
				className="input_margin"
				type="password"
				name="confirmPassword"
				placeholder="Confirm password"
				autoComplete="Confirm Password"
				value={confirmPassword}
				onChange={handleOnChange}
			/>
			<button id="confirmation_btn" className="links" type="submit">
				Sign up
			</button>
			<span>
				{"Already have an account? "}
				<Link className="links" id="signUp-signIn" to={"/login"}>
					Login
				</Link>
			</span>
		</form>
	);
};

export default Signup;
