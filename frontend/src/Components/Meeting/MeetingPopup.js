import React from "react";
import CreateMeeting from "./CreateMeeting";
import DayOverview from "./DayOverview";
import PopUp from "../PopUp";
import { useMeetingPopUp } from "../../contexts/MeetingContext";

const MeetingPopup = () => {
	const { view } = useMeetingPopUp();

	return <PopUp>{view ? <DayOverview /> : <CreateMeeting />}</PopUp>;
};

export default MeetingPopup;
