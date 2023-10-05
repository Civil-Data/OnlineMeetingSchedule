import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import serverUrl from "../utils/config";
import { useUpdateUserContext } from "../contexts/LoginContext";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
    const { saveUser, updateLoginStatus } = useUpdateUserContext();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                serverUrl + "/login",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                saveUser(data.user);
                updateLoginStatus(true);
                setTimeout(() => {
                    navigate("/booking");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            password: "",
        });
    };

    return (
        <div className="form_container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="input_label">
                        Enter your email
                        <b>*</b>
                    </label>
                </div>
                <input
                    className="input_margin"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={handleOnChange}
                />

                <div>
                    <label htmlFor="password" className="input_label">
                        Enter your password
                        <b>*</b>
                    </label>
                </div>
                <input
                    className="input_margin"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                    value={password}
                    onChange={handleOnChange}
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
                <span>
                    No account? <Link to={"/register"}>PRESS HERE</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
