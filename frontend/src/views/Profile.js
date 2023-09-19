// import TypingEffect from "../Components/TypingEffect";
import React from "react";

import ProfileContacts from "../Components/Profile/ProfileContacts";
import ProfileInformation from "../Components/Profile/ProfileInformation";
import ProfileTab from "../Components/Profile/ProfileTab";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";
// import { useTabContext } from "../contexts/ProfileContext";
import { useTabContext } from "../contexts/ProfileContext";
import ProfileMeetings from "../Components/Profile/ProfileMeetings";

// let isOpen;
const Profile = () => {
    // const [displayContacts, setDisplayContacts] = useState(false);
    const tabContext = useTabContext();
    // console.log(tabContext);

    // useEffect(() => {
    //     // isOpen = tabContext;
    // }, []);

    return (
        <>
            <div className="profile_container">
                <div className="top_section">
                    <span>Martin Nilsson</span>
                    {tabContext === "info" ? <EditIcon /> : <PersonAddSharpIcon />}
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

                {tabContext === "info" && <ProfileInformation/>}
                {tabContext === "contacts" && <ProfileContacts/>}
                {tabContext === "my_meetings" && <ProfileMeetings/>}
                
                {/* {tabContext === "info" ? <ProfileInformation /> : <ProfileContacts />} */}


                {/* <div className="bottom_section">
                    <div className="profile_info">
                        {/* <di
                        <label className="user_info_label">Name:</label>
                        <span>Martin Nilsson</span>
                        <label className="user_info_label">Gender:</label>
                        <span>Male</span>
                        <label className="user_info_label">Role:</label>
                        <span>Student</span>
                        <label className="user_info_label">Email:</label>
                        <span>example@gmail.com</span>
                        <label className="user_info_label">Telephone number:</label>
                        <span>070-48289637</span>
                        
                    </div>
                    <div className="user_about">
                        <h3>Here is a description about me:</h3>
                        <p>I am a student at JU and studying Civil engieneer in Data science.</p>
                    </div>
                </div> */}
            </div>
            {/* </ProfileProvider> */}
        </>
    );
};


export default Profile;
