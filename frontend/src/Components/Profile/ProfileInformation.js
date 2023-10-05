import React from "react";
import { useUserContext } from "../../contexts/LoginContext";
import TypingEffect from "../TypingEffect";
import PersonalInfo from "./PersonalInfo";
import { useProfileUpdate } from "../../contexts/ProfileContext";

const ProfileInformation = () => {
    const { user, loginStatus } = useUserContext();
    const { clickedIcon } = useProfileUpdate();

    return (
        <div className="user_information">
            {loginStatus && (
                <PersonalInfo
                    name={user.name}
                    gender={user.gender}
                    email={user.email}
                    telNum={user.telephone}
                />
            )}
            {clickedIcon ? (
                <div className="user_about">
                    <h3>Here is a description about me:</h3>
                    <input placeholder="I am a student at..."></input>
                </div>
            ) : (
                <div className="user_about">
                    <h3>Here is a description about me:</h3>
                    <TypingEffect text={user.description} delay={25} />
                </div>
            )}
        </div>
    );
};

export default ProfileInformation;
