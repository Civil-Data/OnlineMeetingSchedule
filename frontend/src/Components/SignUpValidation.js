import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUpdateLoginStatus } from "../contexts/LoginContext";
// import serverUrl from "../utils/config"; // Import the server URL from a config file

function SignUpValidation() {
    const navigate = useNavigate();
    const updateLoginStatusContext = useUpdateLoginStatus();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    // Event handler to update formData
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleRegistration = async () => {
        try {
            const newUser = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };
            // console.log(newUser);

            const getResponse = await axios.post(
                "http://127.0.0.1:5000/api/users",
                newUser
                // newUser.email
            );
            console.log(getResponse);
            // `${formData.email}`
            // Access formData.username, formData.email, formData.password here
            // Send a POST request to your server with this data
            const postResponse = await axios.post(
                "/users",
                // `${serverUrl}/api/register`,
                // "https://127.0.0.1:5000/api/register",
                newUser
            );
            console.log("User registered:", postResponse.data);
            updateLoginStatusContext(formData.username);
            navigate("/profile");
        } catch (error) {
            console.error(
                "Registration failed MAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!:",
                error
            );
            // Display an error message to the user
        }
    };

    return (
        <>
            <form>
                {/* <form onSubmit={handleInputChange}> */}
                <div>
                    <label htmlFor="username" className="input_label">
                        Enter your username
                        <b>*</b>
                    </label>
                </div>
                <input
                    className="input_margin"
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <div>
                    <label htmlFor="email" className="input_label">
                        Enter your email
                        <b>*</b>
                    </label>
                </div>
                <input
                    className="input_margin"
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <div>
                    <label htmlFor="email" className="input_label">
                        Confirm your email
                        <b>*</b>
                    </label>
                </div>
                <input
                    className="input_margin"
                    type="text"
                    name="email"
                    placeholder="Confirm email"
                    autoComplete="Username"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <div>
                    <label htmlFor="password" className="input_label">
                        Enter your password
                        <b>*</b>
                    </label>
                </div>
                <input
                    className="input_margin"
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <div>
                    <label htmlFor="password" className="input_label">
                        Confirm your password
                        <b>*</b>
                    </label>
                </div>
                <input
                    className="input_margin"
                    type="password"
                    name="password"
                    placeholder="Confirm password"
                    autoComplete="Confirm Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <div>
                    {/* <button
                        type="submit"
                        id="confirmation_btn"
                        className="links"
                    >
                        Register account
                    </button> */}
                    <button
                        id="confirmation_btn"
                        className="links"
                        type="button"
                        onClick={handleRegistration}
                    >
                        Register
                    </button>
                </div>
            </form>
        </>
    );
}

export default SignUpValidation;
