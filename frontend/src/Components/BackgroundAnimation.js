import React from "react";
import "../css/App.css";
import bgd_video from "../video/background.mp4";

const BackgroundAnimation = () => {
    return (
        <video autoPlay loop muted>
            <source src={bgd_video} type="video/mp4" />
        </video>
    );
};

export default BackgroundAnimation;
