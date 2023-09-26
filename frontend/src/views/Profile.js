import React from "react";
import ProfileContacts from "../Components/Profile/ProfileContacts";
import ProfileInformation from "../Components/Profile/ProfileInformation";
import ProfileTab from "../Components/Profile/ProfileTab";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
import { useProfileUpdate, useTabContext } from "../contexts/ProfileContext";
import { useLoginStatusContext } from "../contexts/LoginContext";
import ProfileMeetings from "../Components/Profile/ProfileMeetings";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import Availability from "../Components/Profile/Availability";

const Profile = () => {
    const loginStatusContext = useLoginStatusContext();
    const tabContext = useTabContext();
    const { updateClickedIcon, clickedIcon } = useProfileUpdate();

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
                    {tabContext === "info" && (
                        <>
                            {clickedIcon ? (
                                <div style={{ display: "flex" }}>
                                    <div
                                        onClick={() => {
                                            updateClickedIcon(false);
                                        }}
                                        className="icon"
                                    >
                                        <SaveIcon titleAccess="Save" />
                                    </div>
                                    <div
                                        onClick={() => {
                                            updateClickedIcon(false);
                                        }}
                                        className="icon"
                                    >
                                        <ClearIcon titleAccess="Exit" />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        updateClickedIcon(true);
                                    }}
                                    className="icon"
                                >
                                    <EditIcon titleAccess="Edit" />
                                </div>
                            )}
                        </>
                    )}
                    {tabContext === "contacts" && (
                        <div className="icon">
                            <PersonAddSharpIcon />
                        </div>
                    )}
                    {tabContext === "my_meetings" && (
                        <div className="icon">
                            <Link to="/booking" type="button">
                                <AddIcon titleAccess="Add Booking" />
                            </Link>
                        </div>
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
                    <ProfileTab
                        tab_text="Availability"
                        is_active={tabContext === "availability"}
                        tab_name="availability"
                    />
                </div>
                {tabContext === "info" && <ProfileInformation />}
                {tabContext === "contacts" && <ProfileContacts />}
                {tabContext === "my_meetings" && <ProfileMeetings />}
                {tabContext === "my_meetings" && <ProfileMeetings />}
                {tabContext === "my_meetings" && <ProfileMeetings />}
                {tabContext === "availability" && <Availability />}
            </div>
        </>
    );
};
export default Profile;
