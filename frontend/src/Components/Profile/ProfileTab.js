import React, { useState } from "react";

const ProfileTab = ({ tab_name, is_active }) => {
    const [displayContacts, setDisplayContacts] = useState(false);
    return (
        <span
            onClick={() => {
                setDisplayContacts(true);
                console.log(displayContacts);
            }}
            className={`tab ${is_active ? "active" : ""}`}
        >
            {tab_name}
        </span>
    );
};

export default ProfileTab;
