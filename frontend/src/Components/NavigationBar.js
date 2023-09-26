import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLoginStatusContext } from "../contexts/LoginContext";

const NavigationBar = () => {
    const loginStatusContext = useLoginStatusContext();

    const iconSize = "27px";

    return (
        <div id="navigationBar">
            <div id="left">
                {loginStatusContext !== "" && (
                    <>
                        <Link className="nav-buttons" to="/profile" type="button">
                            <AccountCircleIcon
                                fontSize="large"
                                sx={{ color: "#daa520", height: iconSize }}
                                titleAccess="Profile Page"
                            />
                        </Link>
                        <Link className="nav-buttons" to="/booking" type="button">
                            <AddIcon
                                fontSize="large"
                                sx={{ color: "#daa520", height: iconSize }}
                                titleAccess="Add Booking"
                            />
                        </Link>
                    </>
                )}
            </div>
            {loginStatusContext === "martin@ju.se" ||
            loginStatusContext === "joel@ju.se" ||
            loginStatusContext === "matilda@ju.se" ||
            loginStatusContext === "felix@ju.se" ? (
                <div id="navButtons" className="flex-se right">
                    <span id="logged_in">{loginStatusContext}</span>

                    <Link className="nav-buttons" to="/" type="button">
                        <span>Log out</span>
                    </Link>
                </div>
            ) : (
                <div id="navButtons" className="flex-se right">
                    <Link className="nav-buttons" to="/register" type="button">
                        <i>Sign up</i>
                    </Link>
                    <Link className="nav-buttons" to="/login" type="button">
                        <span>Login</span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavigationBar;
