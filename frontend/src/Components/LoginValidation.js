import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginValidation = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Email validation function
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    // Password validation function
    const validatePassword = (password) => {
        // Check if password is at least 8 characters long
        if (password.length < 8) {
            return false;
        }

        // Check if password contains at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Check if password contains at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return false;
        }

        // Check if password contains at least one digit
        if (!/\d/.test(password)) {
            return false;
        }

        // Check if password contains at least one special character
        if (!/[!"#¤%&/()=?`@£${}\\´ +^~*'[\]]/.test(password)) {
            return false;
        }

        return true;
    };

    const handleSignUp = () => {
        if (
            (validateEmail(email) &&
                validatePassword(password)(
                    email === "joel@ju.se" && password === "Password123!"
                )) ||
            (email === "martin@ju.se" && password === "Password123!") ||
            (email === "felix@ju.se" && password === "Password123!") ||
            (email === "matilda@ju.se" && password === "Password123!")
        ) {
            setError("OK");
        } else {
            // Display an error message for invalid email or password
            alert("Invalid email address or password");
        }
    };

    return (
        <>
            <div>
                <label htmlFor="email" className="input_label">
                    Enter your email
                    <b>*</b>
                </label>
            </div>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => handleEmailChange(e)}
            />

            <div>
                <label htmlFor="password" className="input_label">
                    Enter your password
                    <b>*</b>
                </label>
            </div>
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
            />
            <div>
                <Link
                    id="confirmation_btn"
                    className="links"
                    to={error === "OK" ? "/booking" : "/login"}
                    type="button"
                    onClick={handleSignUp}
                >
                    Login
                </Link>
            </div>
        </>
    );
};

export default LoginValidation;
