// LoginForm.js
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [button, setButton] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const buttonClick = (e) => {
        setButton(true);
    };
    const callback = useCallback(
        (e) => {
            // Perform validation
            if (button) {
                if (!email || !password) {
                    setError("Please fill in all fields");
                    return;
                }

                if (!email.includes("@")) {
                    setError("This is not a correct email");
                    return;
                }

                // Simulate a login process (replace with your actual authentication logic)
                if (
                    email === "user@example.com" &&
                    password === "password123"
                ) {
                    setError("Valid Input");
                } else {
                    setError("Invalid email or password");
                }
            }
        },
        [email, password, button]
    );

    useEffect(() => {
        callback();
    }, [error, email, password, callback]);

    return (
        <>
            <form>
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
                        // value={email}
                        onChange={(e) => handleEmailChange(e)}
                    />
                </>
                <div>
                    <div>
                        <label htmlFor="password" className="input_label">
                            Enter your password
                            <b>*</b>
                        </label>
                    </div>
                    <input
                        type="password"
                        placeholder="password"
                        // value={password}
                        onChange={(e) => handlePasswordChange(e)}
                    />
                </div>
                <div>
                    <Link
                        id="confirmation_btn"
                        className="links"
                        to={error === "Valid Input" ? "/booking" : "/login"}
                        type="button"
                        onClick={(e) => buttonClick(e)}
                    >
                        Login
                    </Link>
                </div>
                <div>
                    {error !== "" && <div className="error">{error}</div>}
                </div>
            </form>
        </>
    );
};

export default LoginForm;
