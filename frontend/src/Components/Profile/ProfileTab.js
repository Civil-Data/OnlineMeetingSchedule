import React from "react";

const ProfileTab = ({ tab_name, is_active }) => {
    return <span className={`tab ${is_active ? "active" : ""}`}>{tab_name}</span>;
};

export default ProfileTab;
