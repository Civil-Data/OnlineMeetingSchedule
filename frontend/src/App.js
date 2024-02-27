import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import SignUp from "./views/SignUp";
import { ProfileProvider } from "./contexts/ProfileContext";
import Login from "./views/Login";
import { MeetingProvider } from "./contexts/MeetingContext";
import NotFound from "./views/NotFound";
import { PageProvider } from "./contexts/PageContext";

function App() {
	return (
		<PageProvider>
			<Routes>
				<Route path="/meeting" element={<MeetingProvider />} />
				<Route path="/profile" element={<ProfileProvider />} />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</PageProvider>
	);
}

export default App;
