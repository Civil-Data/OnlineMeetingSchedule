import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavigationBar = () => {
    return (
        <div id="navigationBar">
            <div id="icons" className="flex-se">
                <HomeIcon fontSize="large" titleAccess="Home Page" />
                <AddIcon fontSize="large" titleAccess="Add Booking" />
                <AccountCircleIcon
                    fontSize="large"
                    titleAccess="Profile Page"
                />
            </div>
            <div id="navButtons" className="flex-se">
                <i>Sign up</i>
                <span>Login</span>
            </div>
        </div>
    );
};

export default NavigationBar;
