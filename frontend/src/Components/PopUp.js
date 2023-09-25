import React from "react";
// import { useDayViewUpdate } from "../contexts/BookingContext";
import ClearIcon from "@mui/icons-material/Clear";
// import Booking from "../Components/Booking";
import { useDayViewUpdate } from "../contexts/BookingContext"; //, openDayView

const PopUp = ({ children }) => {
    // const { openDayView } = useDayViewUpdate();
    const { closeDayView } = useDayViewUpdate();

    return (
        <div className="viewShadow">
            <div className="popUp">
                <div
                    style={{ cursor: "pointer", width: "fit-content" }}
                    onClick={() => {
                        closeDayView();
                    }}
                >
                    <ClearIcon />
                </div>
                {children}
            </div>
        </div>
    );
};

export default PopUp;
