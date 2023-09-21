import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateLoginStatus } from "../contexts/LoginContext";

const LoginValidation = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();
    const updateLoginStatusContext = useUpdateLoginStatus();

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

    const handleSignUp = (e) => {
        e.preventDefault();
        // Check if email and password are valid
        if (
            (validateEmail(email) &&
                validatePassword(password) &&
                email === emailConfirm &&
                password === passwordConfirm) ||
            (email === "joel@ju.se" &&
                password === "Password123!" &&
                email === emailConfirm &&
                password === passwordConfirm) ||
            (email === "martin@ju.se" &&
                password === "Password123!" &&
                email === emailConfirm &&
                password === passwordConfirm) ||
            (email === "felix@ju.se" &&
                password === "Password123!" &&
                email === emailConfirm &&
                password === passwordConfirm) ||
            (email === "matilda@ju.se" &&
                password === "Password123!" &&
                email === emailConfirm &&
                password === passwordConfirm)
        ) {
            updateLoginStatusContext(email);
            navigate("/profile");
        } else {
            // Display an error message for invalid email or password
            alert("Invalid email address or password");
        }
    };

    return (
        <>
            <form onSubmit={handleSignUp}>
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                    <label htmlFor="email" className="input_label">
                        Confirm your email
                        <b>*</b>
                    </label>
                </div>
                <input
                    type="email"
                    placeholder="confirm email"
                    value={emailConfirm}
                    onChange={(e) => setEmailConfirm(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <div>
                    <button
                        type="submit"
                        id="confirmation_btn"
                        className="links"
                    >
                        Register account
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginValidation;
