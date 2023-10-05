import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import serverUrl from "../utils/config";
import { useUpdateUserContext } from "../contexts/LoginContext";

//Component for signup
const Signup = () => {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = useState({
		name: "",
		email: "",
		confirmEmail: "",
		password: "",
		confirmPassword: "",
	});
	const { name, email, confirmEmail, password, confirmPassword } = inputValue;
	const { saveUser, updateLoginStatus } = useUpdateUserContext();

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	const handleError = (err) =>
		toast.error(err, {
			position: "bottom-left",
		});
	const handleSuccess = (msg) =>
		toast.success(msg, {
			position: "bottom-right",
		});

	//Handle all inputs from user
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (email !== confirmEmail) {
			return handleError("Emails do not match");
		}

		if (password !== confirmPassword) {
			return handleError("Passwords do not match");
		}

		if (!name || !email || !password || !confirmEmail || !confirmPassword) {
			return handleError("All fields are required");
		}

		if (password.length < 8) {
			return handleError("Password should be at least 8 characters");
		}

		if (!email.includes("@") || !email.includes(".")) {
			return handleError("Email is not valid");
		}

		try {
			const { data } = await axios.post(
				serverUrl + "/register",

				{ name, email, password },
				{ withCredentials: true }
			);
			const { success, message } = data;
			if (success) {
				handleSuccess(message);
				updateLoginStatus(true);
				saveUser(data.user);
				setTimeout(() => {
					navigate("/profile");
				}, 2000);
			} else {
				handleError(message);
			}
		} catch (error) {
			console.log(error);
		}
		setInputValue({
			...inputValue,
			name: "",
			email: "",
			confirmEmail: "",
			password: "",
			confirmPassword: "",
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name" className="input_label">
						Enter your name
						<b>*</b>
					</label>
				</div>
				<input
					className="input_margin"
					type="text"
					name="name"
					placeholder="Name"
					autoComplete="name"
					value={name}
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
				<div>
					<button
						id="confirmation_btn"
						className="links"
						type="submit"
					>
						Register
					</button>
				</div>
				<span>
					Already have an account?{" "}
					<Link className="links" id="signUp-signIn" to={"/login"}>
						Login
					</Link>
				</span>
			</form>
			<ToastContainer />
		</>
	);
};

export default Signup;
