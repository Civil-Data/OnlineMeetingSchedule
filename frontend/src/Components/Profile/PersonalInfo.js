import React from "react";

const PersonalInfo = ({ name, gender, email, telNum }) => {
    return (
        <div className="user_information">
            <div className="profile_info">
                <label className="user_info_label">Name:</label>
                <span>{name}</span>
                <label className="user_info_label">Gender:</label>
                <span>{gender}</span>
                <label className="user_info_label">Email:</label>
                <span>{email}</span>
                <label className="user_info_label">Telephone number:</label>
                <span className="numbers">{telNum}</span>
            </div>
            {/* <div className="user_about">
                <h3>Here is a description about me:</h3>
                <TypingEffect
                    text="I am a student at Jönköping University."
                    delay={25}
                />
            </div> */}
        </div>
    );
};

export default PersonalInfo;
