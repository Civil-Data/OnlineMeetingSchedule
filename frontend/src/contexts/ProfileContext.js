import React, { useContext, useState } from "react";
import Profile from "../views/Profile";

const TabContext = React.createContext();
const ProfileUpdateContext = React.createContext();

export function useTabContext() {
    return useContext(TabContext);
}
export function useProfileUpdate() {
    return useContext(ProfileUpdateContext);
}

export const ProfileProvider = ({ children }) => {
<<<<<<< HEAD
	const [openTab, setOpenTab] = useState("info");
	const [clickedIcon, setClickedIcon] = useState(false);
	const [details, setDetails] = useState("upcoming");
	// const [status, setStatus] = useState(false);
=======
    const [openTab, setOpenTab] = useState("info");
    const [clickedIcon, setClickedIcon] = useState(false);
    const [details, setDetails] = useState(false);
>>>>>>> f1c4a4c9ec030d0044308464012b1ed28f6cc725

    function updateTabContext(tab) {
        setOpenTab(tab);
    }

    function updateClickedIcon(clickedIcon) {
        setClickedIcon(clickedIcon);
    }

<<<<<<< HEAD
	function updateSubTabContext(details) {
		setDetails(details);
	}

	// function updateMeetingStatus(status) {
	// 	setStatus(status);
	// }

	return (
		<TabContext.Provider value={openTab}>
			<ProfileUpdateContext.Provider
				value={{
					updateTabContext,
					updateClickedIcon,
					clickedIcon,
					details,
					// updateMyMeetings,
					// status,
					updateSubTabContext,
				}}
			>
				{children}
				<Profile />
			</ProfileUpdateContext.Provider>
		</TabContext.Provider>
	);
=======
    function updateMyMeetings(details) {
        setDetails(details);
    }

    return (
        <TabContext.Provider value={openTab}>
            <ProfileUpdateContext.Provider
                value={{
                    updateTabContext,
                    updateClickedIcon,
                    clickedIcon,
                    details,
                    updateMyMeetings,
                }}
            >
                {children}
                <Profile />
            </ProfileUpdateContext.Provider>
        </TabContext.Provider>
    );
>>>>>>> f1c4a4c9ec030d0044308464012b1ed28f6cc725
};
