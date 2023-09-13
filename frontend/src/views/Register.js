import React from "react";
import "../css/App.css";
import { Link } from "react-router-dom";
import AuthInput from "../Components/AuthInput";
import TypingEffect from "../Components/TypingEffect";

const Register = () => {
	return (
		<>
			<h1>Register page</h1>
			<TypingEffect
				text="Please enter your email and a password to sign up."
				delay={25}
			/>
			<div id="email-container" data-step-state="active">
				<AuthInput message="Enter your email" type="email" />
				<AuthInput message="Enter your password" type="password" />

				<Link
					id="confirmation_btn"
					className="links"
					to="/Register"
					type="button"
				>
					Register account
				</Link>
			</div>
		</>
	);
};

export default Register;
