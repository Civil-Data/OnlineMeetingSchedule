import React, { useState } from "react";
import Confirmation from "./Confirmation";
import { useDayViewUpdate } from "../contexts/BookingContext";

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
}

export default ConfirmButton;
