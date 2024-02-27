import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUpdateUserContext } from "../contexts/LoginContext";
import APIHandler from "../utils/api-methods";
import { useToastUpdate } from "../contexts/PageContext";

//Component for Login validation
const Login = () => {
	// const navigate = useNavigate();
	const { sendToastSuccess, sendToastError } = useToastUpdate();
	const { saveUser, isDataSaved, setAuthToken } = useUpdateUserContext();

	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
	});
	const { email, password } = inputValue;
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Handle changes in input fields
	const handleOnChange = e => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			// Send a POST request to login
			const api = new APIHandler();
			const { data } = await api.PostData(
				"/user/login",
				{ ...inputValue },
				{ withCredentials: true }
			);
			// Set the token in local storage
			await setAuthToken(data.token);
			sendToastSuccess(data.message);
			saveUser(data.existingUser);
			// updateLogin(true);
			setIsLoggedIn(true);

			// Redirect to the "/profile" route after successful login
			// setTimeout(() => {
			// 	navigate("/profile");
			// }, 2000);
		} catch (error) {
			console.error(error);
			sendToastError(error.response.data);
		}

		// Clear the password input field
		setInputValue({
			...inputValue,
			password: "",
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="form_container">
				<div>
					<label htmlFor="email" className="input_label">
						Enter your email
						<b>*</b>
					</label>
				</div>
				<input
					className="input_margin"
					name="email"
					type="email"
					placeholder="Email"
					autoComplete="email"
					value={email}
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
					name="password"
					type="password"
					placeholder="Password"
					autoComplete="password"
					value={password}
					onChange={handleOnChange}
				/>
				<button type="submit" id="confirmation_btn" className="links">
					Login
				</button>
				<span>
					{"No account? "}
					<Link className="links" id="signUp-signIn" to={"/signup"}>
						Sign up
					</Link>
				</span>
			</form>
			{isDataSaved && isLoggedIn && <Navigate to={"/profile"} />}
		</>
	);
};

export default Login;
