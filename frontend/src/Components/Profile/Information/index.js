import React from "react";
import { useUserContext } from "../../../contexts/LoginContext";
import PersonalDetails from "./Details";
import { useProfileUpdate } from "../../../contexts/ProfileContext";
import Update from "./Update";

//Component for Profile Information
const ProfileInformation = () => {
	const { loginStatus } = useUserContext();
	const { isUpdateView } = useProfileUpdate();

	return loginStatus && (isUpdateView ? <Update /> : <PersonalDetails />);
};

export default ProfileInformation;
