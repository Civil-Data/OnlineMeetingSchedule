import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavigationBar = () => {
    return (
        <div id="navigationBar">
            <div id="icons" className="flex-se">
                <Link className="nav-buttons" to="/" type="button">
                    <HomeIcon
                        fontSize="large"
                        sx={{ color: "#daa520" }}
                        titleAccess="Home Page"
                    />
                </Link>
                <Link className="nav-buttons" to="/booking" type="button">
                    <AddIcon
                        fontSize="large"
                        sx={{ color: "#daa520" }}
                        titleAccess="Add Booking"
                    />
                </Link>
                <Link className="nav-buttons" to="/profile" type="button">
                    <AccountCircleIcon
                        fontSize="large"
                        sx={{ color: "#daa520" }}
                        titleAccess="Profile Page"
                    />
                </Link>
            </div>
            <div id="navButtons" className="flex-se">
                <Link className="nav-buttons" to="/register" type="button">
                    <i>Sign up</i>
                </Link>
                <Link className="nav-buttons" to="/login" type="button">
                    <span>Login</span>
                </Link>
            </div>
        </div>
    );
};

export default NavigationBar;
