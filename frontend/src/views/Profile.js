// import TypingEffect from "../Components/TypingEffect";

import ProfileInformation from "../Components/Profile/ProfileInformation";
import ProfileTab from "../Components/Profile/ProfileTab";

const Profile = () => {
    return (
        <>
            {/* <h1>Profile page</h1> */}
            {/* <TypingEffect
                text="Welcome to the profile page! Please enter your profile information."
                delay={25}
            /> */}

            <div className="profile_container">
                <div className="top_section">
                    <span>Martin Nilsson</span>
                    <button>Edit</button>
                </div>

                <div className="tab_area">
                    <ProfileTab tab_name="Profile information" is_active={true} />
                    <ProfileTab tab_name="Contacts" />
                    {/* <span className="tab active">Profile information</span>
                    <span className="tab">Contacts</span> */}
                </div>

                <ProfileInformation />
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
        </>
    );
};

export default Profile;
