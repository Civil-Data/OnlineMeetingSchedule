import React from "react";

import { useDayViewUpdate } from "../contexts/MeetingContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MeetingPopup from "../Components/Meeting/MeetingPopup";
import useCalendarRender from "../hooks/Meeting/useCalendarRender";

const Meeting = () => {
	const { dayView, monthToDisplay, yearToDisplay, updateMonthToDisplay, updateYearToDisplay } =
		useDayViewUpdate();

	const { rows, monthString, dateElementList } = useCalendarRender();

	function updateMonth(monthStep) {
		if (monthToDisplay === 0 && monthStep < 0) {
			updateYearToDisplay(yearToDisplay - 1);
			updateMonthToDisplay(11);
		} else if (monthToDisplay === 11 && monthStep > 0) {
			updateYearToDisplay(yearToDisplay + 1);
			updateMonthToDisplay(0);
		} else {
			updateMonthToDisplay(monthToDisplay + monthStep);
		}
	}

	return (
		<>
			{dayView && <MeetingPopup />}

			<div className="calender_area">
				<div
					className="grid-container"
					style={{
						gridTemplateRows: `auto 25px repeat(${rows}, 100px)`,
					}}
				>
					<div className="month">
						<div className="arrowBox" onClick={() => updateMonth(-1)}>
							<ArrowBackIosNewIcon />
						</div>
						<div style={{ width: "300px" }}>
							{monthString} {yearToDisplay}
						</div>
						<div className="arrowBox" onClick={() => updateMonth(1)}>
							<ArrowForwardIosIcon />
						</div>
					</div>
					<div className="day">Monday</div>
					<div className="day">Tuesday</div>
					<div className="day">Wednesday</div>
					<div className="day">Thursday</div>
					<div className="day">Friday</div>
					<div className="day">Saturday</div>
					<div className="day">Sunday</div>
					{dateElementList}
				</div>
			</div>
		</>
	);
};

export default Meeting;
