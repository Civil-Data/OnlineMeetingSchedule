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
					firstName={user.firstName}
					lastName={user.lastName}
					gender={user.gender}
					email={user.email}
					telephone={user.telephone}
					age={user.age}
					description={user.description}
					password={user.password}
				/>
			)}
			{!clickedIcon && (
				<div className="user_about">
					<h3>Here is a description about me:</h3>
					<TypingEffect text={user.description} delay={25} />
				</div>
			)}
		</div>
	);
};

export default ProfileInformation;
