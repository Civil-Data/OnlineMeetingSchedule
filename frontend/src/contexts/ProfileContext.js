import React, { useContext, useState } from "react";

const TabContext = React.createContext();

export function useTabContext(TabContext) {
    return useContext(TabContext);
}

export const ProfileContext = ({ children }) => {
    const [openTab, setOpenTab] = useState();

    function updateTabContext(tab) {
        setOpenTab(tab);
    }

    return (
        <TabContext.Provider value={{ openTab, updateTabContext }}>{children}</TabContext.Provider>
    );
};
