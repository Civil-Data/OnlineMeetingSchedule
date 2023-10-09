import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Register from "./views/Register";
import NavigationBar from "./Components/NavigationBar";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { BookingProvider } from "./contexts/BookingContext";
import Pages from "./Components/Pages";
// import { useUserContext } from "./contexts/LoginContext";

function App() {
	// const { loginStatus } = useUserContext();
	return (
		<>
			<NavigationBar />
			<Pages>
				<Routes>
					{/* {loginStatus ? (
						<> */}
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/booking" element={<BookingProvider />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<ProfileProvider />} />
					{/* </>
					) : (
						<>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</>
					)} */}
				</Routes>
			</Pages>
		</>
	);
}

export default App;
