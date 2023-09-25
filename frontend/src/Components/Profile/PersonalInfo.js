import React from "react";
import { useProfileUpdate } from "../../contexts/ProfileContext";

const PersonalInfo = ({ name, gender, email, telNum }) => {
    const { clickedIcon } = useProfileUpdate();

    return (
        <div className="user_information">
            <div className="profile_info">
                {/* <div className="userFields"> */}
                <label className="user_info_label">Name:</label>
                {clickedIcon ? (
                    <input type="text" value={name} />
                ) : (
                    <span>{name}</span>
                )}
                {/* </div> */}
                {/* <div className="userFields"> */}
                <label className="user_info_label">Gender:</label>
                {clickedIcon ? (
                    <input type="text" value={gender} />
                ) : (
                    <span>{gender}</span>
                )}
                {/* </div> */}
                {/* <div className="userFields"> */}
                <label className="user_info_label">Email:</label>
                {clickedIcon ? (
                    <input type="text" value={email} />
                ) : (
                    <span>{email}</span>
                )}
                {/* </div> */}
                {/* <div className="userFields"> */}
                <label className="user_info_label">Phone number:</label>
                {clickedIcon ? (
                    <input type="text" value={telNum} />
                ) : (
                    <span className="numbers">{telNum}</span>
                )}
                {/* </div> */}
            </div>
        </div>
    );
};

export default PersonalInfo;
