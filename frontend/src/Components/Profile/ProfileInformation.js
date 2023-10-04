import React from "react";
import { useLoginStatusContext } from "../../contexts/LoginContext";
import TypingEffect from "../TypingEffect";
import PersonalInfo from "./PersonalInfo";
import { useProfileUpdate } from "../../contexts/ProfileContext";

const ProfileInformation = () => {
	const loginStatusContext = useLoginStatusContext();
	const { clickedIcon } = useProfileUpdate();

	return (
		<div className="user_information">
			{loginStatusContext === "martin@ju.se" && (
				<PersonalInfo
					name="Martin Nilsson"
					gender="Male"
					email={loginStatusContext}
					telNum="+46701234567"
				/>
			)}
			{loginStatusContext === "joel@ju.se" && (
				<PersonalInfo
					name="Joel Scarinius"
					gender="Male"
					email={loginStatusContext}
					telNum="+46701234567"
				/>
			)}
			{loginStatusContext === "matilda@ju.se" && (
				<PersonalInfo
					name="Matilda Ronder"
					gender="Female"
					email={loginStatusContext}
					telNum="+46701234567"
				/>
			)}
			{loginStatusContext === "felix@ju.se" && (
				<PersonalInfo
					name="Felix Stockinger"
					gender="Male"
					email={loginStatusContext}
					telNum="+46701234567"
				/>
			)}
			{clickedIcon ? (
				<div className="user_about">
					<h3>Here is a description about me:</h3>
					<input placeholder="I am a student at..."></input>
				</div>
			) : (
				<div className="user_about">
					<h3>Here is a description about me:</h3>
					<TypingEffect
						text="I am a student at Jönköping University."
						delay={25}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfileInformation;
