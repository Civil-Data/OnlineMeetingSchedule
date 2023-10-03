// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUpdateLoginStatus } from "../contexts/LoginContext";

// const LoginValidation = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const updateLoginStatusContext = useUpdateLoginStatus();

//     // Email validation function
//     const validateEmail = (email) => {
//         const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         return regex.test(email);
//     };

//     // Password validation function
//     const validatePassword = (password) => {
//         // Check if password is at least 8 characters long
//         if (password.length < 8) {
//             return false;
//         }

//         // Check if password contains at least one uppercase letter
//         if (!/[A-Z]/.test(password)) {
//             return false;
//         }

//         // Check if password contains at least one lowercase letter
//         if (!/[a-z]/.test(password)) {
//             return false;
//         }

//         // Check if password contains at least one digit
//         if (!/\d/.test(password)) {
//             return false;
//         }

//         // Check if password contains at least one special character
//         if (!/[!"#¤%&/()=?`@£${}\\´ +^~*'[\]]/.test(password)) {
//             return false;
//         }

//         return true;
//     };

//     const handleSignUp = (e) => {
//         e.preventDefault();
//         if (
//             (validateEmail(email) && validatePassword(password)) ||
//             (email === "joel@ju.se" && password === "Password123!") ||
//             (email === "martin@ju.se" && password === "Password123!") ||
//             (email === "felix@ju.se" && password === "Password123!") ||
//             (email === "matilda@ju.se" && password === "Password123!")
//         ) {
//             updateLoginStatusContext(email);
//             navigate("/booking");
//         } else {
//             // Display an error message for invalid email or password
//             alert("Invalid email address or password");
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSignUp}>
//                 <div>
//                     <label htmlFor="email" className="input_label">
//                         Enter your email
//                         <b>*</b>
//                     </label>
//                 </div>
//                 <input
//                     className="input_margin"
//                     type="email"
//                     placeholder="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <div>
//                     <label htmlFor="password" className="input_label">
//                         Enter your password
//                         <b>*</b>
//                     </label>
//                 </div>
//                 <input
//                     className="input_margin"
//                     type="password"
//                     placeholder="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <div>
//                     <button
//                         type="submit"
//                         id="confirmation_btn"
//                         className="links"
//                     >
//                         Login
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default LoginValidation;

// import { useState } from "react";

// function App() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     async function loginUser(event) {
//         event.preventDefault();

//         const response = await fetch("http://localhost:1337/api/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         });

//         const data = await response.json();

//         if (data.user) {
//             window.location.href = "/booking";
//         } else {
//         }
//     }

//     return (
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={loginUser}>
//                 <input
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     placeholder="Email"
//                 />
//                 <br />
//                 <input
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     type="password"
//                     placeholder="Password"
//                 />
//                 <br />
//                 <input type="submit" value="Login" />
//             </form>
//         </div>
//     );
// }

// export default App;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
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
                "http://localhost:1337/login",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/Home");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        });
    };

    return (
        <div className="form_container">
            <h2>Login Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit">Submit</button>
                <span>
                    Already have an account?{" "}
                    <Link to={"/register"}>Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
