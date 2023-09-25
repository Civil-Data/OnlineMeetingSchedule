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
        </div>
    );
};

export default PersonalInfo;
