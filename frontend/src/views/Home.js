// import { Link } from "react-router-dom";
// import BackgroundAnimation from "../Components/BackgroundAnimation";
// import TypingEffect from "../Components/TypingEffect";
// import { useUpdateLoginStatus } from "../contexts/LoginContext";

// const Home = () => {
//     const updateLoginStatusContext = useUpdateLoginStatus();
//     updateLoginStatusContext("");

//     return (
//         <>
//             <BackgroundAnimation />
//             <div className="titles">
//                 <h1>Welcome to our meeting scheduling site!</h1>

//                 <h3>
//                     <TypingEffect
//                         text="Here you can schedule meetings with your friends and colleagues."
//                         delay={25}
//                     />
//                 </h3>

//                 <h2>Please Login or Sign up here!</h2>
//                 <div className="login_area">
//                     <Link to="/register" className="links">
//                         Click here to sign up!
//                     </Link>
//                     <Link to="/login" className="links">
//                         Click here to login!
//                     </Link>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:1337",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                      position: "top-right",
                  })
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    const Logout = () => {
        removeCookie("token");
        navigate("/register");
    };
    return (
        <>
            <div className="home_page">
                <h4>
                    {" "}
                    Welcome <span>{username}</span>
                </h4>
                <button onClick={Logout}>LOGOUT</button>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;
