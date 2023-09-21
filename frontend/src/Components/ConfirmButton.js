import React, { useState } from "react";
import Confirmation from "./Confirmation";

function ConfirmButton({ closePopup, selectedTime }) {
	const [showComponent, setShowComponent] = useState(false);
	const [buttonText, setButtonText] = useState("Confirm booking");

	const toggleComponent = (e) => {
		const text = e.target.innerText;
		// console.log(text);
		if (text === "Back to booking") {
			closePopup();
		} else {
			setShowComponent((prevState) => !prevState);
			setButtonText("Back to booking");
		}
	};

	return (
		<div>
			<button id="confirmation_btn" onClick={(e) => toggleComponent(e)}>
				{buttonText}
			</button>
			{showComponent && <Confirmation />}
		</div>
	);
}

export default ConfirmButton;
