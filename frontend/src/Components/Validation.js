// LoginForm.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm({ type, message }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        // Simulate a login process (replace with your actual authentication logic)
        if (email === "user@example.com" && password === "password123") {
            setError("");
            alert("You have successfully logged in!");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={type} className="input_label">
                        {message}
                        <b>*</b>
                    </label>
                    <input
                        type={type}
                        placeholder={type}
                        onChange={
                            type === "password"
                                ? handlePasswordChange
                                : handleEmailChange
                        }
                    />
                </div>
                {error === "" ? (
                    <Link
                        id="confirmation_btn"
                        className="links"
                        to="/booking"
                        type="button"
                    >
                        Login
                    </Link>
                ) : (
                    <></>
                )}
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default LoginForm;
