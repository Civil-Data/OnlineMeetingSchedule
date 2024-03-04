import React from "react";
import { useUserContext } from "../../../contexts/LoginContext";
import TypingEffect from "../../TypingEffect";

//Component for User information
const PersonalDetails = () => {
	const { user } = useUserContext();

	return (
		<div className="user_information">
			<div className="profile_info">
				<label className="user_info_label">First name:</label>
				<span>{user.firstName}</span>

				<label className="user_info_label">Last name:</label>
				<span>{user.lastName}</span>

				<label className="user_info_label">Gender:</label>
				<span>{user.gender}</span>

				<label className="user_info_label">Email:</label>
				<span>{user.email}</span>

				<label className="user_info_label">Phone number:</label>
				<span className="numbers">{user.telephone}</span>

				<label className="user_info_label">Age:</label>
				<span className="numbers">{user.age}</span>

				<label className="user_info_label">Password:</label>
				<span>********</span>
			</div>
			<div className="user_about">
				<h3 style={{ color: "goldenrod" }}>Here is a description about me:</h3>
				<TypingEffect text={user.description} delay={25} />
			</div>
		</div>
	);
};

export default PersonalDetails;
