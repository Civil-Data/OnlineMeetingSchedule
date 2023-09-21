import { Link } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLoginStatusContext } from "../contexts/LoginContext";

const NavigationBar = () => {
	const loginStatusContext = useLoginStatusContext();

	return (
		<div id="navigationBar">
			<div id="icons" className="flex-se">
				{/* <Link className="nav-buttons" to="/Home" type="button">
                    <HomeIcon
                        fontSize="large"
                        sx={{ color: "#daa520" }}
                        titleAccess="Home Page"
                    />
                </Link> */}
				<Link className="nav-buttons" to="/profile" type="button">
					<AccountCircleIcon
						fontSize="large"
						sx={{ color: "#daa520" }}
						titleAccess="Profile Page"
					/>
				</Link>
				<Link className="nav-buttons" to="/booking" type="button">
					<AddIcon
						fontSize="large"
						sx={{ color: "#daa520" }}
						titleAccess="Add Booking"
					/>
				</Link>
			</div>
			{loginStatusContext === "martin@ju.se" ||
			loginStatusContext === "joel@ju.se" ||
			loginStatusContext === "matilda@ju.se" ||
			loginStatusContext === "felix@ju.se" ? (
				<div id="navButtons" className="flex-se">
					<span>
						{loginStatusContext} <p>logged in</p>
					</span>

					<Link className="nav-buttons" to="/" type="button">
						<span>Log out</span>
					</Link>
				</div>
			) : (
				<div id="navButtons" className="flex-se">
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
