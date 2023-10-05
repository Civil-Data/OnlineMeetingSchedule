import React, { useState } from "react";
import Confirmation from "./Confirmation";
import { useDayViewUpdate } from "../contexts/BookingContext";

<<<<<<< HEAD
//Component for Confirm button
function ConfirmButton({ selectedTime }) {
	const [showComponent, setShowComponent] = useState(false);
	const [buttonText, setButtonText] = useState("Confirm booking");
	const { closeDayView } = useDayViewUpdate();

	//Check if the booking is done or not
	const toggleComponent = (e) => {
		const text = e.target.innerText;
		if (text === "Back to booking") {
			closeDayView();
		} else {
			setShowComponent((prevState) => !prevState);
			setButtonText("Back to booking");
		}
	};

	//Return booking confirmation
	return (
		<>
			<button id="confirmation_btn" onClick={(e) => toggleComponent(e)}>
				{buttonText}
			</button>
			{showComponent && <Confirmation />}
		</>
	);
=======
function ConfirmButton({ isDisabled }) {
    const [showComponent, setShowComponent] = useState(false);
    const [buttonText, setButtonText] = useState("Send Invite");
    const { closeDayView } = useDayViewUpdate();

    const toggleComponent = (e) => {
        const text = e.target.innerText;
        if (text === "Back to booking") {
            closeDayView();
        } else {
            setShowComponent((prevState) => !prevState);
            setButtonText("Back to booking");
        }
    };

    return (
        <>
            <button
                disabled={isDisabled}
                id="confirmation_btn"
                onClick={(e) => toggleComponent(e)}
            >
                {buttonText}
            </button>
            {showComponent && <Confirmation />}
        </>
    );
>>>>>>> origin
}

export default ConfirmButton;
