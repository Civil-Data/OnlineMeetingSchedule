import React from "react";
import MeetingItem from "../Profile/MeetingItem";

const DayOverview = () => {
	const meetings = true;

	return (
		<div className="calender_meeting_overview">
			{meetings ? (
				<>
					<MeetingItem />
					<MeetingItem />
					<MeetingItem />
					<MeetingItem />
					<MeetingItem />
				</>
			) : (
				<div className="dayOverview">No meetings booked for this day.</div>
			)}
		</div>
	);
};

export default DayOverview;
