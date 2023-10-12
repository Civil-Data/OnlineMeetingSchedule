import React from "react";
import { useProfileUpdate } from "../../contexts/ProfileContext";
import { useUpdateUserContext } from "../../contexts/LoginContext";
import { toast } from "react-toastify";
import axios from "axios";
import serverUrl from "../../utils/config";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer } from "react-toastify";
import { isAlpha, isEmail } from "validator";

//Component for User information
const PersonalInfo = ({
	firstName,
	lastName,
	gender,
	email,
	telephone,
	age,
	description,
	password,
}) => {
	const { clickedIcon, updateClickedIcon } = useProfileUpdate();
	const { saveUser } = useUpdateUserContext();
	let emailChanged = false;
	const [inputValue, setInputValue] = useState({
		newFirstName: firstName,
		newLastName: lastName,
		newGender: gender,
		newEmail: email,
		newTelephone: telephone,
		newAge: age,
		newDescription: description,
		newPassword: "",
		newConfirmEmail: email,
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

	const handleOnChange = e => {
		const { name, value } = e.target;
		setInputValue({
			...inputValue,
			[name]: value,
		});
	};

	const handleError = err =>
		toast.error(err, {
			position: "bottom-left",
		});
	const handleSuccess = msg =>
		toast.success(msg, {
			position: "bottom-right",
		});

	const handleSubmit = async e => {
		e.preventDefault();

		if (+newTelephone < 0) {
			return handleError("You can't have negative numbers in a phone number");
		}

		if (isAlpha(String(newTelephone))) {
			return handleError("You can't have letters in a phone number");
		}

		if (+newAge < 0) {
			return handleError("You can't have negative age");
		}

		if (!isAlpha(newFirstName) || !isAlpha(newLastName)) {
			return handleError("First name and last name should be letters");
		}

		if (newEmail !== newConfirmEmail) {
			return handleError("Emails do not match");
		}

		if (newPassword !== newConfirmPassword) {
			return handleError("Passwords do not match");
		}

		if (!isEmail(newEmail)) {
			return handleError("Email is not valid");
		}

		if (newPassword === "") {
			return handleError("Password is a required field and cannot be empty");
		}

		if (newPassword.length < 8) {
			return handleError("Password should be at least 8 characters");
		}

		if (newEmail !== email) {
			emailChanged = true;
		}
		// Send a POST request to update user information
		try {
			const { data } = await axios.post(
				serverUrl + "/updateUser",
				{
					newFirstName: newFirstName === "" ? firstName : newFirstName,
					newLastName: newLastName === "" ? lastName : newLastName,
					newGender,
					newEmail: newEmail === "" ? email : newEmail,
					newTelephone,
					newAge,
					newDescription,
					newPassword,
					emailChanged,
				},
				{ withCredentials: true }
			);
			emailChanged = false;
			const { success, message } = data;
			if (success) {
				handleSuccess(message);
				saveUser(data.user);
				updateClickedIcon(false);
			} else {
				handleError(message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="profile_info">
				<label className="user_info_label">First name:</label>
				{clickedIcon ? (
					<input
						type="text"
						name="newFirstName"
						autoComplete="newFirstName"
						value={newFirstName}
						placeholder={newFirstName}
						onChange={handleOnChange}
					/>
				) : (
					<span>{newFirstName}</span>
				)}

				<label className="user_info_label">Last name:</label>
				{clickedIcon ? (
					<input
						type="text"
						name="newLastName"
						autoComplete="newLastName"
						value={newLastName}
						placeholder={newLastName}
						onChange={handleOnChange}
					/>
				) : (
					<span>{newLastName}</span>
				)}

				<label className="user_info_label">Gender:</label>
				{clickedIcon ? (
					<select
						id="gender_container"
						name="newGender"
						value={newGender}
						onChange={handleOnChange}
					>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
						<option value="Don't want to specify">Don't want to specify</option>
					</select>
				) : (
					<span>{gender}</span>
				)}

				<label className="user_info_label">Email:</label>
				{clickedIcon ? (
					<input
						name="newEmail"
						type="email"
						autoComplete="email"
						value={newEmail}
						placeholder={email}
						onChange={handleOnChange}
					/>
				) : (
					<span>{email}</span>
				)}

				{clickedIcon && (
					<>
						<label className="user_info_label">Confirm email:</label>
						<input
							name="newConfirmEmail"
							type="email"
							autoComplete="confirmEmail"
							value={newConfirmEmail}
							placeholder={email}
							onChange={handleOnChange}
						/>
					</>
				)}

				<label className="user_info_label">Phone number:</label>
				{clickedIcon ? (
					<input
						name="newTelephone"
						type="tel"
						autoComplete="telephone"
						value={newTelephone}
						onChange={handleOnChange}
						placeholder={telephone}
					/>
				) : (
					<span className="numbers">{telephone}</span>
				)}

				<label className="user_info_label">Age:</label>
				{clickedIcon ? (
					<input
						name="newAge"
						type="number"
						autoComplete="age"
						value={newAge}
						placeholder={age}
						onChange={handleOnChange}
					/>
				) : (
					<span className="numbers">{age}</span>
				)}

				<label className="user_info_label">Password:</label>
				{clickedIcon ? (
					<input
						name="newPassword"
						type="password"
						autoComplete="password"
						value={newPassword}
						placeholder="Password"
						onChange={handleOnChange}
					/>
				) : (
					<span>********</span>
				)}

				{clickedIcon && (
					<>
						<label className="user_info_label">Confirm password:</label>
						<input
							name="newConfirmPassword"
							type="password"
							autoComplete="password"
							value={newConfirmPassword}
							placeholder="Confirm password"
							onChange={handleOnChange}
						/>
					</>
				)}

				{clickedIcon && (
					<>
						<label className="user_info_label">
							<h3>Here is a description about me:</h3>{" "}
						</label>
						<input
							name="newDescription"
							type="text"
							autoComplete="description"
							value={newDescription}
							placeholder="Description about me..."
							onChange={handleOnChange}
						></input>
						<button type="submit" id="confirmation_btn" className="links">
							SAVE
							<SaveIcon titleAccess="Save" />
						</button>
					</>
				)}
			</div>
			<ToastContainer />
		</form>
	);
};

export default PersonalInfo;
