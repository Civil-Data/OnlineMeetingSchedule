import React from "react";
import { useTabUpdate } from "../../contexts/ProfileContext";

const ProfileTab = ({ tab_text, is_active, tab_name }) => {
    const updateTabContext = useTabUpdate();
    // const [displayContacts, setDisplayContacts] = useState(false);
    return (
        <span
            onClick={() => {
                updateTabContext(tab_name);

                console.log(tab_name);
                // console.log(displayContacts);
            }}
            className={`tab ${is_active ? "active" : ""}`}
        >
            {tab_text}
        </span>
    );
};

export default ProfileTab;
