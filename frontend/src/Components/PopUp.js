import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { useDayViewUpdate, useMeetingPopUp } from "../contexts/MeetingContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

//Component for popup window
const PopUp = ({ children }) => {
	const { closeDayView } = useDayViewUpdate();
	const { view, toggleCreateMeeting } = useMeetingPopUp();

	return (
		<div className="viewShadow">
			<div className="popUp">
				<header>
					{view ? (
						<span
							style={{ cursor: "pointer" }}
							onClick={() => {
								closeDayView();
							}}
						>
							<ClearIcon titleAccess="Exit" />
						</span>
					) : (
						<span
							style={{ cursor: "pointer" }}
							onClick={() => {
								toggleCreateMeeting();
							}}
						>
							<ArrowBackIosNewIcon titleAccess="Go back" />
						</span>
					)}
					{view && (
						<span
							style={{ cursor: "pointer" }}
							onClick={() => {
								toggleCreateMeeting();
							}}
							title="Book a meeting"
						>
							<AddIcon
								sx={{ transform: "scale(1.3)" }}
								titleAccess="Create a meeting"
							/>
						</span>
					)}
				</header>
				{children}
			</div>
		</div>
	);
};

export default PopUp;
