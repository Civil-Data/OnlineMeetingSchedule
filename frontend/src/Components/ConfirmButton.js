import React, { useState } from "react";
import { useDayViewUpdate } from "../contexts/MeetingContext";

//Component for Confirm button
function ConfirmButton({ isDisabled, bookMeeting }) {
	const [showComponent, setShowComponent] = useState(false);
	const [buttonText, setButtonText] = useState("Confirm meeting");
	const { closeDayView } = useDayViewUpdate();

	//Check if the meeting is done or not
	const toggleComponent = (e) => {
		const text = e.target.innerText;
		if (text === "Back to meeting") {
			closeDayView();
		} else {
			setShowComponent((prevState) => !prevState);
			setButtonText("Back to meeting");
		}
	};

	return (
		<>
			<button
				disabled={isDisabled}
				className={`confirm_meeting ${isDisabled ? "" : "active"}`}
				onClick={(e) => {
					const text = e.target.innerText;
					if (text === "Confirm meeting") {
						bookMeeting();
						toggleComponent(e);
					} else toggleComponent(e);
				}}
			>
				{buttonText}
			</button>
			{showComponent && (
				<div className="confirmationText">
					<h2>Your meeting is now scheduled!</h2>
				</div>
			)}
		</>
	);
}

export default ConfirmButton;
