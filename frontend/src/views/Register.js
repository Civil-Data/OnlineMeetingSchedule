import React from "react";
import "../css/App.css";

const Register = () => {
	return (
		<>
			<h1>Register page</h1>
			<p id="typing-element" />
			<div id="email-container" data-step-state="active">
				<div>
					<label htmlFor="email">
						Enter your email
						<b>*</b>
					</label>
				</div>
			</div>
			{/* Add the input here */}
			<a id="confirmation_btn" href="profile.html" type="button">
				Register account
			</a>
		</>
	);
};

export default Register;
