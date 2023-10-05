import React, { useState } from "react";
import { useDayViewUpdate } from "../contexts/BookingContext";

//Component for Confirm button
function ConfirmButton({ isDisabled }) {
	const [showComponent, setShowComponent] = useState(false);
	const [buttonText, setButtonText] = useState("Confirm booking");
	const { closeDayView } = useDayViewUpdate();

	//Check if the booking is done or not
	const toggleComponent = e => {
		const text = e.target.innerText;
		if (text === "Back to booking") {
			closeDayView();
		} else {
			setShowComponent(prevState => !prevState);
			setButtonText("Back to booking");
		}
	};

	return (
		<>
			<button disabled={isDisabled} id="confirmation_btn" onClick={e => toggleComponent(e)}>
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
