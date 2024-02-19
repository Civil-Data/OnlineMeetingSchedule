import React from "react";
import { useUserContext } from "../../contexts/LoginContext";
import TypingEffect from "../TypingEffect";
import PersonalInfo from "./PersonalInfo";
import { useProfileUpdate } from "../../contexts/ProfileContext";

//Component for Profile Information
const ProfileInformation = () => {
	const { user, loginStatus } = useUserContext();
	const { clickedIcon } = useProfileUpdate();

	return (
		<div className="user_information">
			{loginStatus && (
				<PersonalInfo
					firstName={user.existingUser.firstName}
					lastName={user.existingUser.lastName}
					gender={user.existingUser.gender}
					email={user.existingUser.email}
					telephone={user.existingUser.telephone}
					age={user.existingUser.age}
					description={user.existingUser.description}
					password={user.existingUser.password}
				/>
			)}
			{!clickedIcon && (
				<div className="user_about">
					<h3>Here is a description about me:</h3>
					<TypingEffect
						text={user.existingUser.description}
						delay={25}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfileInformation;
