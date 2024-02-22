import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import NavigationBar from "./Components/NavigationBar";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { MeetingProvider } from "./contexts/MeetingContext";
import Pages from "./Components/Pages";
import NotFound from "./views/NotFound";

function App() {
	return (
		<>
			{window.location.pathname === "/" && <NavigationBar />}
			{window.location.pathname === "/login" && <NavigationBar />}
			{window.location.pathname === "/signup" && <NavigationBar />}
			{window.location.pathname === "/meeting" && <NavigationBar />}
			{window.location.pathname === "/profile" && <NavigationBar />}
			<Pages>
				<Routes>
					<Route path="/meeting" element={<MeetingProvider />} />
					<Route path="/profile" element={<ProfileProvider />} />
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Pages>
		</>
	);
}

export default App;
