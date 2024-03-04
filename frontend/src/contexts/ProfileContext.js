import React, { useContext, useState } from "react";
import Profile from "../views/Profile";
import { useUserContext } from "./LoginContext";

const TabContext = React.createContext();
const ProfileUpdateContext = React.createContext();

export function useTabContext() {
	return useContext(TabContext);
}
export function useProfileUpdate() {
	return useContext(ProfileUpdateContext);
}

// Context provider component for managing the currently open tab and profile update-related data
export const ProfileProvider = ({ children }) => {
	const { justSignedUp } = useUserContext();
	const [openTab, setOpenTab] = useState(justSignedUp ? "info" : "my_meetings");
	const [isUpdateView, setIsUpdateView] = useState(false);
	const [details, setDetails] = useState("upcoming");

	function updateTabContext(tab) {
		setOpenTab(tab);
	}

	function showUpdateView(isClicked) {
		setIsUpdateView(isClicked);
	}

	function updateSubTabContext(details) {
		setDetails(details);
	}

	return (
		<TabContext.Provider value={openTab}>
			<ProfileUpdateContext.Provider
				value={{
					updateTabContext,
					showUpdateView,
					isUpdateView,
					details,
					updateSubTabContext,
				}}
			>
				{children}
				<Profile />
			</ProfileUpdateContext.Provider>
		</TabContext.Provider>
	);
};
