import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useLoginStatusContext,
    useUpdateLoginStatus,
} from "../../contexts/LoginContext";

const LoginValidation = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const loginStatusContext = useLoginStatusContext();
    const updateLoginStatusContext = useUpdateLoginStatus();
    console.log(updateLoginStatusContext);

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
        if (
            (validateEmail(email) && validatePassword(password)) ||
            (email === "joel@ju.se" && password === "Password123!") ||
            (email === "martin@ju.se" && password === "Password123!") ||
            (email === "felix@ju.se" && password === "Password123!") ||
            (email === "matilda@ju.se" && password === "Password123!")
        ) {
            // loginStatusContext(email);
            updateLoginStatusContext(email);
            console.log(updateLoginStatusContext);
            navigate("/booking");
        } else {
            // Display an error message for invalid email or password
            alert("Invalid email address or password");
        }
    };

    return (
        <>
            {/* <span
                onClick={() => {
                    updateTabContext(tab_name);
                }}
                className={`tab ${is_active ? "active" : ""}`}
            >
                {tab_text}
            </span> */}
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
                    <button
                        type="submit"
                        id="confirmation_btn"
                        className="links"
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginValidation;
