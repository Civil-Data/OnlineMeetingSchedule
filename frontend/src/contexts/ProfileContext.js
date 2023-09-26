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
    const [openTab, setOpenTab] = useState("info");
    const [clickedIcon, setClickedIcon] = useState(false);

    function updateTabContext(tab) {
        setOpenTab(tab);
    }

    function updateClickedIcon(clickedIcon) {
        setClickedIcon(clickedIcon);
    }

    return (
        <TabContext.Provider value={openTab}>
            <ProfileUpdateContext.Provider
                value={{ updateTabContext, updateClickedIcon, clickedIcon }}
            >
                {children}
                <Profile />
            </ProfileUpdateContext.Provider>
        </TabContext.Provider>
    );
};
