import React, { useContext, useState } from "react";
import Profile from "../views/Profile";

const TabContext = React.createContext();
const TabUpdateContext = React.createContext();

export function useTabContext() {
    return useContext(TabContext);
}
export function useTabUpdate() {
    return useContext(TabUpdateContext);
}

export const ProfileProvider = ({ children }) => {
    const [openTab, setOpenTab] = useState("info");

    function updateTabContext(tab) {
        setOpenTab(tab);
    }

    return (
        <TabContext.Provider value={openTab}>
            <TabUpdateContext.Provider value={updateTabContext}>
                {children}
                <Profile />
            </TabUpdateContext.Provider>
        </TabContext.Provider>
    );
};
