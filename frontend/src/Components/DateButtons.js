import React from "react";

const DateButtons = () => {
	const dateLabels = Array.from({ length: 31 }, (_, index) => index + 1);

	return (
		<div>
			{dateLabels.map((date) => (
				<button key={date} className="dates">
					{date}
				</button>
			))}
		</div>
	);
};

export default DateButtons;
