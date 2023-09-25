import React from "react";
// import PopUp from "../PopUp";

// const meeting = {
//     id: 0,
//     Name: "",
//     Hour: "",
//     Minute: "",
//     Participant "",
// }

const ProfileMeetings = () => {
    return (
        // const { dayView, date } = useDayView();            {dayView && (})
        <ul className="meeting_list">
            <li className="meeting_list_item  ">
                <span className="meeting_list_sub_item">Leader </span>
                <span className="meeting_list_sub_item">yyyy/mm/dd xx:xx</span>
                <span className="meeting_list_sub_item">Place</span>
                <span className="meeting_list_sub_item">
                    Participant 1 (Y/N)
                </span>
                <span className="meeting_list_sub_item">
                    Participant 2 (Y/N)
                </span>
                <span className="meeting_list_sub_item">
                    Participant 3 (Y/N)
                </span>
                <span className="meeting_list_sub_item">
                    Participant 4 (Y/N)
                </span>

                <div className="button_area">
                    <button>Accept</button>
                    <button>Decline</button>
                    {/* Add different options that matches the role of the user, if accepted or not */}
                    {/* If user is leader then add cancel button */}
                    {/* If leader cancels meeting then remove meeting for all*/}
                    {/* If user is invited then add accept and decline buttons */}
                    {/* if user has accepted then add Cancel meeting */}
                    {/* If cancelled or declined then remove meeting/invite from user */}
                </div>
            </li>
            <li className="meeting_list_item  ">
                <span className="meeting_list_sub_item">Martin Nilsson </span>
                <span className="meeting_list_sub_item">2023/09/20 11:35</span>
                <span className="meeting_list_sub_item">E1219</span>
                <span className="meeting_list_sub_item">
                    Felix Stockinger (Y)
                </span>
                <span className="meeting_list_sub_item">
                    Matilda Ronder (N)
                </span>
                <span className="meeting_list_sub_item">
                    Joel (Not Confirmed?)
                </span>
                <span className="meeting_list_sub_item">
                    !Example for the leader view!
                </span>

                <div className="button_area">
                    <button>Cancel Meeting</button>
                </div>
            </li>
            <li className="meeting_list_item  ">
                <span className="meeting_list_sub_item">Martin Nilsson </span>
                <span className="meeting_list_sub_item">2023/09/20 11:35</span>
                <span className="meeting_list_sub_item">E1219</span>
                <span className="meeting_list_sub_item">
                    Felix Stockinger (Y)
                </span>
                <span className="meeting_list_sub_item">
                    Matilda Ronder (N)
                </span>
                <span className="meeting_list_sub_item">
                    Joel (Not Confirmed?)
                </span>
                <span className="meeting_list_sub_item">
                    !Example for the Participant view!
                </span>

                <div className="button_area">
                    <button>Cancel Appointment</button>
                </div>
            </li>
        </ul>
    );
};

export default ProfileMeetings;
