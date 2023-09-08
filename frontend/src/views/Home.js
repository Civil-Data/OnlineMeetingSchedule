import React from "react";
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
                <a href="register.html">Click here to register!</a>
                <a href="login.html">Click here to login!</a>
            </div>
        </>
    );
};

export default Home;
