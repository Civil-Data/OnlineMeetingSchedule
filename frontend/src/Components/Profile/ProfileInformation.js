import React from "react";

const ProfileInformation = () => {
    return (
        <div className="user_information">
            <div className="profile_info">
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
                <p>I am a student at Jönköping University</p>
            </div>
        </div>
    );
};

export default ProfileInformation;
