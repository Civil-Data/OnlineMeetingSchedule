import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useUserContext } from "../contexts/LoginContext";

const NavigationBar = () => {
    const { loginStatus, user } = useUserContext();

    const iconSize = "27px";

    return (
        <div id="navigationBar">
            <div id="left">
                {loginStatus && (
                    <>
                        <Link
                            className="nav-buttons"
                            to="/profile"
                            type="button"
                        >
                            <AccountCircleIcon
                                fontSize="large"
                                sx={{ color: "#daa520", height: iconSize }}
                                titleAccess="Profile Page"
                            />
                        </Link>
                        <Link
                            className="nav-buttons"
                            to="/booking"
                            type="button"
                        >
                            <AddIcon
                                fontSize="large"
                                sx={{ color: "#daa520", height: iconSize }}
                                titleAccess="Add Booking"
                            />
                        </Link>
                    </>
                )}
            </div>
            {loginStatus ? (
                <div id="navButtons" className="flex-se right">
                    <span id="logged_in">{user.name}</span>

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
