import React from "react";
import { Link } from "react-router-dom";
import BackgroundAnimation from "../Components/BackgroundAnimation";
import "../css/App.css";

const Home = () => {
    return (
        <>
            <BackgroundAnimation />

            <h1>Welcome to our meeting scheduling site!</h1>

            <h3>
                <p id="typing-element"></p>
            </h3>

            <h2>Please Login or Sign up here!</h2>
            <div className="login_area">
                {/* <Link href="./Register" className="links">
                    Click here to register!
                </Link> */}
                <Link to="/login" className="links">
                    Click here to login!
                </Link>
            </div>
        </>
    );
};

export default Home;
