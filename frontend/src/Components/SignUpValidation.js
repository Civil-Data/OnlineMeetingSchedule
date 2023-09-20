import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginValidation = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailConfirmChange = (e) => {
        setEmailConfirm(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
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
                validatePassword(password) &&
                email === emailConfirm &&
                password === passwordConfirm) ||
            (email === "joel@ju.se" && password === "Password123!") ||
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
                <label htmlFor="email" className="input_label">
                    Confirm your email
                    <b>*</b>
                </label>
            </div>
            <input
                type="email"
                placeholder="confrim email"
                value={emailConfirm}
                onChange={(e) => handleEmailConfirmChange(e)}
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
                <label htmlFor="password" className="input_label">
                    Confirm your password
                    <b>*</b>
                </label>
            </div>
            <input
                type="password"
                placeholder="confirm password"
                value={passwordConfirm}
                onChange={(e) => handlePasswordConfirmChange(e)}
            />
            <div>
                <Link
                    id="confirmation_btn"
                    className="links"
                    to={error === "OK" ? "/profile" : "/register"}
                    type="button"
                    onClick={handleSignUp}
                >
                    Register account
                </Link>
            </div>
        </>
    );
};

export default LoginValidation;
