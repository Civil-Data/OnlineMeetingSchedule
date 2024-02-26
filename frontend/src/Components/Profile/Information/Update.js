import React, { useRef } from "react";
import { useProfileUpdate } from "../../../contexts/ProfileContext";
import { useUpdateUserContext, useUserContext } from "../../../contexts/LoginContext";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { isAlpha, isEmail } from "validator";
import APIHandler from "../../../utils/api-methods";
import { useToastUpdate } from "../../../contexts/PageContext";

// Component for updateing user information
const Update = () => {
	const { user } = useUserContext();
	const { sendToastSuccess, sendToastError } = useToastUpdate();

	const iconRef = useRef();
	const { showUpdateView } = useProfileUpdate();
	const { saveUser } = useUpdateUserContext();
	// let emailChanged = false;
	const [inputValue, setInputValue] = useState({
		id: user.id,
		newFirstName: user.firstName,
		newLastName: user.lastName,
		newGender: user.gender,
		newEmail: user.email,
		newTelephone: user.telephone,
		newAge: user.age,
		newDescription: user.description,
		newPassword: "",
		newConfirmEmail: user.email,
		newConfirmPassword: "",
	});

	const {
		newFirstName,
		newLastName,
		newGender,
		newEmail,
		newTelephone,
		newAge,
		newDescription,
		newPassword,
		newConfirmEmail,
		newConfirmPassword,
	} = inputValue;

	console.log(inputValue);

	const hover = isHover => {
		if (isHover) iconRef.current.style.color = "black";
		else iconRef.current.style.color = "goldenrod";
	};

	const handleOnChange = (name, value) => {
		// const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	// const handleError = err =>
	// 	toast.error(err, {
	// 		position: "bottom-left",
	// 	});
	// const handleSuccess = msg =>
	// 	toast.success(msg, {
	// 		position: "bottom-right",
	// 	});

	const handleSubmit = async e => {
		e.preventDefault();

		if (+newTelephone < 0) {
			return sendToastError("You can't have negative numbers in a phone number");
		}

		if (isAlpha(String(newTelephone))) {
			return sendToastError("You can't have letters in a phone number");
		}

		if (+newAge < 0) {
			return sendToastError("You can't have negative age");
		}

		if (!isAlpha(newFirstName) || !isAlpha(newLastName)) {
			return sendToastError("First name and last name should be letters");
		}

		if (newEmail !== newConfirmEmail) {
			return sendToastError("Emails do not match");
		}

		if (newPassword !== newConfirmPassword) {
			return sendToastError("Passwords do not match");
		}

		if (!isEmail(newEmail)) {
			return sendToastError("Email is not valid");
		}

		if (newPassword === "") {
			return sendToastError("Password is a required field and cannot be empty");
		}

		if (newPassword.length < 8) {
			return sendToastError("Password should be at least 8 characters");
		}

		// if (newEmail !== user.email) {
		// 	emailChanged = true;
		// }
		// Send a POST request to update user information
		try {
			const api = new APIHandler();

			const { data } = await api.PostData(
				"/user/update",
				{
					newId: user.id,
					newFirstName: newFirstName === "" ? user.firstName : newFirstName,
					newLastName: newLastName === "" ? user.lastName : newLastName,
					newGender,
					newEmail: newEmail === "" ? user.email : newEmail,
					newTelephone,
					newAge,
					newDescription,
					newPassword,
					// emailChanged,
				},
				{ withCredentials: true }
			);
			// emailChanged = false;
			sendToastSuccess(data.message);
			saveUser(data.user);
			showUpdateView(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="user_information">
				<div className="profile_info">
					<label className="user_info_label">First name:</label>
					<input
						type="text"
						name="newFirstName"
						autoComplete="on"
						value={newFirstName}
						placeholder={newFirstName}
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					/>

					<label className="user_info_label">Last name:</label>
					<input
						type="text"
						name="newLastName"
						autoComplete="on"
						value={newLastName}
						placeholder={newLastName}
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					/>

					<label className="user_info_label">Gender:</label>
					<select
						id="gender_container"
						name="newGender"
						value={newGender}
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					>
						<option value="" hidden></option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>

					<label className="user_info_label">Email:</label>
					<input
						name="newEmail"
						type="email"
						autoComplete="on"
						value={newEmail}
						placeholder={user.email}
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					/>

					<label className="user_info_label">Confirm email:</label>
					<input
						name="newConfirmEmail"
						type="email"
						autoComplete="on"
						value={newConfirmEmail}
						placeholder={user.email}
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					/>

					<label className="user_info_label">Phone number:</label>
					<input
						name="newTelephone"
						type="tel"
						autoComplete="on"
						value={newTelephone}
						onChange={e => handleOnChange(e.target.name, e.target.value)}
						placeholder={user.telephone ? "" : "XXX-XXX XX XX"}
					/>

					<label className="user_info_label">Age:</label>
					<input
						name="newAge"
						type="number"
						autoComplete="on"
						value={newAge}
						placeholder={user.age}
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					/>

					<label className="user_info_label">Password:</label>
					<input
						name="newPassword"
						type="password"
						autoComplete="on"
						value={newPassword}
						placeholder="Password"
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					/>

					<label className="user_info_label">Confirm password:</label>
					<input
						name="newConfirmPassword"
						type="password"
						autoComplete="on"
						value={newConfirmPassword}
						placeholder="Confirm password"
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					/>
				</div>

				<div className="description_area">
					<label className="user_info_label">
						<h3>Here is a description about me:</h3>
					</label>
					<textarea
						name="newDescription"
						type="text"
						autoComplete="on"
						value={newDescription}
						placeholder="Description about me..."
						onChange={e => handleOnChange(e.target.name, e.target.value)}
					></textarea>
				</div>
			</div>
			<div className="saveProfile-container">
				<button
					type="submit"
					id="confirmation_btn"
					className="links"
					onMouseEnter={() => hover(true)}
					onMouseLeave={() => hover(false)}
				>
					SAVE
					<SaveIcon titleAccess="Save" style={{ margin: "0 10px" }} ref={iconRef} />
				</button>
			</div>
		</form>
	);
};

export default Update;
