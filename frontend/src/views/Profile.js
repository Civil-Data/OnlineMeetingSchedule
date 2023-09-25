import React from "react";
import ProfileContacts from "../Components/Profile/ProfileContacts";
import ProfileInformation from "../Components/Profile/ProfileInformation";
import ProfileTab from "../Components/Profile/ProfileTab";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import { useTabContext } from "../contexts/ProfileContext";
import { useLoginStatusContext } from "../contexts/LoginContext";
import ProfileMeetings from "../Components/Profile/ProfileMeetings";

const Profile = () => {
    const loginStatusContext = useLoginStatusContext();
    const tabContext = useTabContext();

    return (
        <>
            <div className="profile_container">
                <div className="top_section">
                    {loginStatusContext === "martin@ju.se" && (
                        <span>Martin Nilsson</span>
                    )}
                    {loginStatusContext === "matilda@ju.se" && (
                        <span>Matilda Ronder</span>
                    )}
                    {loginStatusContext === "felix@ju.se" && (
                        <span>Felix Stockinger</span>
                    )}
                    {loginStatusContext === "joel@ju.se" && (
                        <span>Joel Scarinius</span>
                    )}
                    {tabContext === "info" ? (
                        <EditIcon />
                    ) : (
                        <PersonAddSharpIcon />
                    )}
                </div>
                <div className="tab_area">
                    <ProfileTab
                        tab_text="Profile information"
                        is_active={tabContext === "info"}
                        tab_name="info"
                    />
                    <ProfileTab
                        tab_text="Contacts"
                        is_active={tabContext === "contacts"}
                        tab_name="contacts"
                    />
                    <ProfileTab
                        tab_text="My Meetings"
                        is_active={tabContext === "my_meetings"}
                        tab_name="my_meetings"
                    />
                </div>
                {tabContext === "info" && <ProfileInformation />}
                {tabContext === "contacts" && <ProfileContacts />}
                {tabContext === "my_meetings" && <ProfileMeetings />}
            </div>
        </>
    );
};

export default Profile;
