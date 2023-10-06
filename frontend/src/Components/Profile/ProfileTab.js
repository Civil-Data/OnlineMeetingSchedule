import React from "react";
import { useProfileUpdate } from "../../contexts/ProfileContext";

//Component for Profile tab
const ProfileTab = ({ tab_text, is_active, tab_name }) => {
	const { updateTabContext } = useProfileUpdate();
	return (
		<span
			onClick={() => {
				updateTabContext(tab_name);
			}}
			className={`tab ${is_active ? "active" : ""}`}
		>
			{tab_text}
		</span>
	);
};

export default ProfileTab;
