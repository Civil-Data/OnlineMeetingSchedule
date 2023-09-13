// import TypingEffect from "../Components/TypingEffect";

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
                    <span className="tab active">Your information</span>
                    <span className="tab">Contacts</span>
                </div>

                <div className="bottom_section">
                    <div className="profile_info">
                        {/* <div className="right_float"> */}
                        <label className="user_info_label">Name:</label>
                        <p>Martin Nilsson</p>
                        <label className="user_info_label">Gender:</label>
                        <p>Male</p>
                        <label className="user_info_label">Role:</label>
                        <p>Student</p>
                        <label className="user_info_label">Email:</label>
                        <p>example@gmail.com</p>
                        <label className="user_info_label">Telephone number:</label>
                        {/* </div> */}
                        {/* <div className="user_info_values"> */}
                        <p>070-48289637</p>
                        {/* </div> */}
                    </div>
                    <div className="user_about">
                        <h3>Here is a description about me:</h3>
                        <p>I am a student at JU and studying Civil engieneer in Data science.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
