import React, { useState } from "react";
import CreateMeeting from "./CreateMeeting";
import DayOverview from "./DayOverview";
import PopUp from "../PopUp";

const MeetingPopup = () => {
	const [view, setView] = useState(0);

	return <PopUp>{view === 0 ? <DayOverview /> : <CreateMeeting />}</PopUp>;
};

export default MeetingPopup;
