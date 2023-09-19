import React from "react";
import { useTabUpdate } from "../../contexts/ProfileContext";

const ProfileTab = ({ tab_text, is_active, tab_name }) => {
    const updateTabContext = useTabUpdate();
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
