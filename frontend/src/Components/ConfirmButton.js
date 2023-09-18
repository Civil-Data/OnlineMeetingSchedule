import React, { useState } from "react";
import Confirmation from "./Confirmation";

function ConfirmButton() {
    const [showComponent, setShowComponent] = useState(false);
    const [buttonText, setButtonText] = useState("Confirm booking");

    const toggleComponent = () => {
        setShowComponent((prevState) => !prevState);
        setButtonText((prevStateText) => {
            return prevStateText === "Confirm booking"
                ? "Back to booking"
                : "Confirm booking";
        });
    };

    return (
        <div>
            <button id="confirmation_btn" onClick={toggleComponent}>
                {buttonText}
            </button>
            {showComponent ? (
                <Confirmation />
            ) : (
                <p>Original content goes here</p>
            )}
        </div>
    );
}

export default ConfirmButton;
