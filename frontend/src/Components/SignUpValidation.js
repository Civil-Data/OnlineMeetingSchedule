// import React, { useState } from "react";
// import { useUpdateLoginStatus } from "../contexts/LoginContext";
// // import serverUrl from "../utils/config"; // Import the server URL from a config file
// import * as Yup from "yup";
// import { Formik } from "formik";
// import { Field, ErrorMessage } from "formik";
// import axios from "axios";

// const SignUpValidation = () => {
//     const [name, setName] = useState("");
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [confirmEmail, setConfirmEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const updateLoginStatusContext = useUpdateLoginStatus();

//     const handleRegistration = (e) => {
//         e.preventDefault();
//         handleSubmit();
//         // if (validateEmail(email) && validatePassword(password)) {
//         // updateLoginStatusContext(email);
//         // if (registrationSchema().isValid()) {
//         //     alert("Valid registration");
//         //     registerUser();
//         // } else {
//         //     alert("Invalid registration");
//         // }
//     };

//     const registrationSchema = Yup.object().shape({
//         name: Yup.string().min(4, "Name must be at least 4 characters"),
//         username: Yup.string()
//             .min(4, "Username must be at least 4 characters")
//             .required("Username is required"),
//         email: Yup.string()
//             .email("Invalid email address")
//             .required("Email is required")
//             .oneOf([Yup.ref("confirmEmail"), null], "Emails must match"),
//         confirmEmail: Yup.string()
//             .email("Invalid email address")
//             .required("Confirm email is required")
//             .oneOf([Yup.ref("email"), null], "Emails must match"),
//         password: Yup.string()
//             .min(8, "Password must be at least 8 characters")
//             .required("Password is required")
//             .oneOf([Yup.ref("confirmPassword"), null], "Passwords must match"),
//         confirmPassword: Yup.string()
//             .min(8, "Password must be at least 8 characters")
//             .required("Confirm password is required")
//             .oneOf([Yup.ref("password"), null], "Passwords must match"),
//     });

//     // async function registerUser(e) {
//     //     const response = await fetch("http://localhost:1337/api/register", {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //         },
//     //         body: JSON.stringify({
//     //             name,
//     //             username,
//     //             email,
//     //             confirmEmail,
//     //             password,
//     //             confirmPassword,
//     //         }),
//     //     });
//     //     const data = await response.json();
//     //     if (data.status === "ok") {
//     //         updateLoginStatusContext(username);
//     //         window.location.href = "/profile";
//     //     }
//     // }

//     const handleSubmit = async (values, { setSubmitting }) => {
//         try {
//             const response = await axios.post("api/register", values); // Make the API request

//             // Handle the successful registration response, e.g., show a success message
//             console.log("Registration successful", response.data);
//             updateLoginStatusContext(username);
//             window.location.href = "/profile";
//         } catch (error) {
//             // Handle registration error, e.g., display error messages
//             console.error("Registration error", error.response.data);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     name: "",
//                     username: "",
//                     email: "",
//                     confirmEmail: "",
//                     password: "",
//                     confirmPassword: "",
//                 }}
//                 validationSchema={registrationSchema}
//                 onSubmit={handleRegistration}
//             >
//                 {(formikProps) => (
//                     <form>
//                         <div>
//                             <label htmlFor="name" className="input_label">
//                                 Enter your name
//                                 <b>*</b>
//                             </label>
//                             <ErrorMessage name="name" component="div" />
//                         </div>
//                         <Field
//                             className="input_margin"
//                             type="text"
//                             name="name"
//                             placeholder="Name"
//                             autoComplete="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                         {/* <input
//                         className="input_margin"
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         autoComplete="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     /> */}
//                         <div>
//                             <label htmlFor="username" className="input_label">
//                                 Enter your username
//                                 <b>*</b>
//                             </label>
//                             <ErrorMessage name="username" component="div" />
//                         </div>
//                         <Field
//                             className="input_margin"
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             autoComplete="Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                         {/* <input
//                         className="input_margin"
//                         type="text"
//                         name="username"
//                         placeholder="Username"
//                         autoComplete="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     /> */}
//                         <div>
//                             <label htmlFor="email" className="input_label">
//                                 Enter your email
//                                 <b>*</b>
//                             </label>
//                             <ErrorMessage name="email" component="div" />
//                         </div>
//                         <Field
//                             className="input_margin"
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             autoComplete="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />

//                         {/* <input
//                         className="input_margin"
//                         type="text"
//                         name="email"
//                         placeholder="Email"
//                         autoComplete="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     /> */}
//                         <div>
//                             <label htmlFor="email" className="input_label">
//                                 Confirm your email
//                                 <b>*</b>
//                             </label>
//                             <ErrorMessage
//                                 name="Confirm email"
//                                 component="div"
//                             />
//                         </div>
//                         <Field
//                             className="input_margin"
//                             type="email"
//                             name="Confirm email"
//                             placeholder="Confirm email"
//                             autoComplete="Confirm email"
//                             value={confirmEmail}
//                             onChange={(e) => setConfirmEmail(e.target.value)}
//                         />
//                         {/* <input
//                         className="input_margin"
//                         type="text"
//                         name="email"
//                         placeholder="Confirm email"
//                         autoComplete="Confirm email"
//                         value={confirmEmail}
//                         onChange={(e) => setConfirmEmail(e.target.value)}
//                     /> */}
//                         <div>
//                             <label htmlFor="password" className="input_label">
//                                 Enter your password
//                                 <b>*</b>
//                             </label>
//                             <ErrorMessage name="password" component="div" />
//                         </div>
//                         <Field
//                             className="input_margin"
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             autoComplete="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         {/* <input
//                         className="input_margin"
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         autoComplete="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     /> */}
//                         <div>
//                             <label htmlFor="password" className="input_label">
//                                 Confirm your password
//                                 <b>*</b>
//                             </label>
//                             <ErrorMessage
//                                 name="Confirm Password"
//                                 component="div"
//                             />
//                         </div>
//                         <Field
//                             className="input_margin"
//                             type="password"
//                             name="password"
//                             placeholder="Confirm password"
//                             autoComplete="Confirm Password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                         {/* <input
//                         className="input_margin"
//                         type="password"
//                         name="password"
//                         placeholder="Confirm password"
//                         autoComplete="Confirm Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     /> */}
//                         <div>
//                             {/* <button
//                         type="submit"
//                         id="confirmation_btn"
//                         className="links"
//                     >
//                         Register account
//                     </button> */}
//                             <button
//                                 id="confirmation_btn"
//                                 className="links"
//                                 type="submit"
//                                 disabled={formikProps.isSubmitting}
//                                 // onClick={handleRegistration}
//                             >
//                                 Register
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </Formik>
//         </>
//     );
// };

// export default SignUpValidation;

// import React, { useState } from "react";
// import { useUpdateLoginStatus } from "../contexts/LoginContext";
// // import serverUrl from "../utils/config"; // Import the server URL from a config file
// import * as Yup from "yup";
// import { Formik } from "formik";
// import { Field, ErrorMessage } from "formik";
// import axios from "axios";

// const SignUpValidation = () => {
//     const [name, setName] = useState("");
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [confirmEmail, setConfirmEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const updateLoginStatusContext = useUpdateLoginStatus();

//     const handleRegistration = (e) => {
//         e.preventDefault();
//         // if (validateEmail(email) && validatePassword(password)) {
//         handleSubmit();
//         // updateLoginStatusContext(email);
//         // if (registrationSchema().isValid()) {
//         //     alert("Valid registration");
//         //     registerUser();
//         // } else {
//         //     alert("Invalid registration");
//         // }
//     };

//     // async function registerUser(e) {
//     //     const response = await fetch("http://localhost:1337/api/register", {
//     //         method: "POST",
//     //         headers: {
//     //             "Content-Type": "application/json",
//     //         },
//     //         body: JSON.stringify({
//     //             name,
//     //             username,
//     //             email,
//     //             confirmEmail,
//     //             password,
//     //             confirmPassword,
//     //         }),
//     //     });
//     //     const data = await response.json();
//     //     if (data.status === "ok") {
//     //         updateLoginStatusContext(username);
//     //         window.location.href = "/profile";
//     //     }
//     // }

//     const handleSubmit = async () => {
//         try {
//             const response = await axios.post(
//                 "http://localhost:1337/api/register"
//             );

//             // Handle the successful registration response, e.g., show a success message
//             console.log("Registration successful", response.data);
//             updateLoginStatusContext(username);
//             window.location.href = "/profile";
//         } catch (error) {
//             // Handle registration error, e.g., display error messages
//             console.error("Registration error", error.response.data);
//         }
//     };

//     return (
//         <>
//             <form>
//                 <div>
//                     <label htmlFor="name" className="input_label">
//                         Enter your name
//                         <b>*</b>
//                     </label>
//                 </div>
//                 <input
//                     className="input_margin"
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     autoComplete="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <div>
//                     <label htmlFor="username" className="input_label">
//                         Enter your username
//                         <b>*</b>
//                     </label>
//                 </div>
//                 <input
//                     className="input_margin"
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     autoComplete="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <div>
//                     <label htmlFor="email" className="input_label">
//                         Enter your email
//                         <b>*</b>
//                     </label>
//                 </div>
//                 <input
//                     className="input_margin"
//                     type="text"
//                     name="email"
//                     placeholder="Email"
//                     autoComplete="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <div>
//                     <label htmlFor="email" className="input_label">
//                         Confirm your email
//                         <b>*</b>
//                     </label>
//                 </div>
//                 <input
//                     className="input_margin"
//                     type="text"
//                     name="email"
//                     placeholder="Confirm email"
//                     autoComplete="Confirm email"
//                     value={confirmEmail}
//                     onChange={(e) => setConfirmEmail(e.target.value)}
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
//                     name="password"
//                     placeholder="Password"
//                     autoComplete="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <div>
//                     <label htmlFor="password" className="input_label">
//                         Confirm your password
//                         <b>*</b>
//                     </label>
//                 </div>

//                 <input
//                     className="input_margin"
//                     type="password"
//                     name="password"
//                     placeholder="Confirm password"
//                     autoComplete="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <div>
//                     <button
//                         id="confirmation_btn"
//                         className="links"
//                         type="submit"
//                         onClick={handleRegistration}
//                     >
//                         Register
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default SignUpValidation;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: "",
    });
    const { email, password, username } = inputValue;
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
            position: "bottom-right",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:1337/register",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
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
            username: "",
        });
    };

    return (
        <div className="form_container">
            <h2>Signup Account</h2>
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
                    <label htmlFor="email">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
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
                    Already have an account? <Link to={"/login"}>Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Signup;
