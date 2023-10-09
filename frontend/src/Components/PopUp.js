import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useDayViewUpdate } from "../contexts/MeetingContext";

//Component for popup window
const PopUp = ({ children }) => {
	const { closeDayView } = useDayViewUpdate();

	return (
		<div className="viewShadow">
			<div className="popUp">
				<header>
					<span
						style={{ cursor: "pointer" }}
						onClick={() => {
							closeDayView();
						}}
					>
						<ClearIcon />
					</span>
					<span
						style={{ cursor: "pointer" }}
						onClick={() => {
							closeDayView();
						}}
						title="Book a meeting"
					>
						<AddIcon sx={{ transform: "scale(1.3)" }} />
					</span>
				</header>
				{children}
			</div>
		</div>
	);
};

export default PopUp;
