import React from "react";
import { Link } from "react-router-dom";
import AuthInput from "../Components/AuthInput";
import TypingEffect from "../Components/TypingEffect";

const Login = () => {
    return (
        <div>
            <h1>Login page</h1>
            <TypingEffect text="Welcome back! Please login to your account." delay={25} />
            <div id="email-container" data-step-state="active">
                <AuthInput message="Enter your email" type="email" />
                <AuthInput message="Enter your password" type="password" />
                <Link id="confirmation_btn" className="links" to="/booking" type="button">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Login;
