import React from "react";
import MeetingItem from "./MeetingItem";

//Component for Meeting overview
const ProfileMeetings = () => {
    return (
        <>
            <div className="profile_container">
                <div className="top_section">
                    <MeetingItem />
                </div>
            </div>
        </>
    );
};

export default ProfileMeetings;
