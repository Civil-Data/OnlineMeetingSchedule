import React from "react";
import { useProfileUpdate } from "../../contexts/ProfileContext";
import { useUpdateUserContext } from "../../contexts/LoginContext";
import { toast } from "react-toastify";
import axios from "axios";
import serverUrl from "../../utils/config";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer } from "react-toastify";

const PersonalInfo = ({ name, gender, email, telephone, age, description, password }) => {
	const { clickedIcon } = useProfileUpdate();
	const { saveUser } = useUpdateUserContext();
	let emailChanged = false;
	const [inputValue, setInputValue] = useState({
		newName: name,
		newGender: gender,
		newEmail: email,
		newTelephone: telephone,
		newAge: age,
		newDescription: description,
		newPassword: password,
		newConfirmEmail: email,
		newConfirmPassword: password,
	});

	const {
		newName,
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

		if (newEmail !== newConfirmEmail) {
			return handleError("Emails do not match");
		}

		if (newPassword !== newConfirmPassword) {
			return handleError("Passwords do not match");
		}

		if (newPassword.length < 8) {
			return handleError("Password should be at least 8 characters");
		}

		if (!newEmail.includes("@") || !newEmail.includes(".")) {
			return handleError("Email is not valid");
		}

		if (newEmail !== email) {
			emailChanged = true;
		}
		console.log(emailChanged);
		console.log(newEmail);

		try {
			const data = await axios.post(
				serverUrl + "/updateUser",
				{
					newName,
					newGender,
					newEmail,
					newTelephone,
					newAge,
					newDescription,
					newPassword,
					emailChanged,
				},
				{ withCredentials: true }
			);
			emailChanged = false;
			console.log(data);
			const { success, message, user } = data;
			if (success) {
				handleSuccess(message);
				saveUser(user);
			} else {
				handleError(message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="profile_info">
				<label className="user_info_label">Name:</label>
				{clickedIcon ? (
					<input
						type="text"
						name="newName"
						autoComplete="name"
						value={newName}
						placeholder={name}
						onChange={handleOnChange}
					/>
				) : (
					<span>{name}</span>
				)}

				<label className="user_info_label">Gender:</label>
				{clickedIcon ? (
					<input
						type="text"
						name="newGender"
						autoComplete="gender"
						value={newGender}
						placeholder={gender}
						onChange={handleOnChange}
					/>
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
