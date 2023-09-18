import Title from "../Components/Title";
import React from "react";
import "../css/App.css";
import { Link } from "react-router-dom";
import AuthInput from "../Components/AuthInput";
import TypingEffect from "../Components/TypingEffect";

const Register = () => {
    return (
        <div className="titles">
            <Title title="Register page" className="titles" />

            <TypingEffect
                text="Please enter your email and a password to sign up."
                delay={25}
            />
            <div id="email-container" data-step-state="active">
                <AuthInput message="Enter your email" type="email" />
                <AuthInput message="Enter your password" type="password" />

                <Link
                    id="confirmation_btn"
                    className="links"
                    to="/profile"
                    type="button"
                >
                    Register account
                </Link>
            </div>
        </div>
    );
};

export default Register;
