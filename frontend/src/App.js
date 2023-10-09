import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import NavigationBar from "./Components/NavigationBar";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { BookingProvider } from "./contexts/BookingContext";
import Pages from "./Components/Pages";
import PrivateRoute from "./Components/PrivateRoute";
import { useUserContext } from "./contexts/LoginContext";

function App() {
	const { loginStatus } = useUserContext();
	const [navigation, setNavigation] = useState("/");

	const checkLoginStatus = () => {
		if (loginStatus && window.location.pathname === "/booking") {
			setNavigation( "profile");
		} else if (loginStatus && window.location.pathname === "/profile"){
			setNavigation( "booking");
	};


	return (
		<>
			<NavigationBar />
			<Pages>
				<BrowserRouter>
					<>
						{/* {loginStatus ? (
						<> */}
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<PrivateRoute
							path="/profile"
							component={<ProfileProvider />}
						/>
						{/* <Route path="/booking" element={<BookingProvider />} />
					<Route path="/profile" element={<ProfileProvider />} /> */}
						{/* </>
					) : (
						<>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</>
					)} */}
					</>
				</BrowserRouter>
			</Pages>
		</>
	);
}

export default App;
