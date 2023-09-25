import React from "react";
import { useLoginStatusContext } from "../../contexts/LoginContext";
import TypingEffect from "../TypingEffect";
import PersonalInfo from "./PersonalInfo";

const ProfileInformation = () => {
    const loginStatusContext = useLoginStatusContext();

    return (
        <div className="user_information">
            {loginStatusContext === "martin@ju.se" && (
                <PersonalInfo
                    name="Martin Nilsson"
                    gender="Male"
                    email={loginStatusContext}
                    telNum="+46701234567"
                />
            )}
            {loginStatusContext === "joel@ju.se" && (
                <PersonalInfo
                    name="Joel Scarinius"
                    gender="Male"
                    email={loginStatusContext}
                    telNum="+46701234567"
                />
            )}
            {loginStatusContext === "matilda@ju.se" && (
                <PersonalInfo
                    name="Matilda Ronder"
                    gender="Female"
                    email={loginStatusContext}
                    telNum="+46701234567"
                />
            )}
            {loginStatusContext === "felix@ju.se" && (
                <PersonalInfo
                    name="Felix Stockinger"
                    gender="Male"
                    email={loginStatusContext}
                    telNum="+46701234567"
                />
            )}
            {/* <div className="profile_info">
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
            </div> */}
            <div className="user_about">
                <h3>Here is a description about me:</h3>
                <TypingEffect
                    text="I am a student at Jönköping University."
                    delay={25}
                />
            </div>
        </div>
    );
};

export default ProfileInformation;
