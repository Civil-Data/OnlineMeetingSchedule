import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useDayViewUpdate } from "../contexts/BookingContext"; //, openDayView

const PopUp = ({ children }) => {
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
