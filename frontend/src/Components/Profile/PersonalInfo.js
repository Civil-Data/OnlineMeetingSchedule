import React from "react";
import { useProfileUpdate } from "../../contexts/ProfileContext";

const PersonalInfo = ({ name, gender, email, telNum }) => {
    const { clickedIcon } = useProfileUpdate();

    return (
        <div className="profile_info">
            <label className="user_info_label">Name:</label>
            {clickedIcon ? <input type="text" placeHolder={name} /> : <span>{name}</span>}

            <label className="user_info_label">Gender:</label>
            {clickedIcon ? <input type="text" placeHolder={gender} /> : <span>{gender}</span>}

            <label className="user_info_label">Email:</label>
            {clickedIcon ? <input type="text" placeHolder={email} /> : <span>{email}</span>}

            <label className="user_info_label">Phone number:</label>
            {clickedIcon ? (
                <input type="text" placeHolder={telNum} />
            ) : (
                <span className="numbers">{telNum}</span>
            )}
        </div>
    );
};

export default PersonalInfo;
