import { Link } from "react-router-dom";
import BackgroundAnimation from "../Components/BackgroundAnimation";
import TypingEffect from "../Components/TypingEffect";

const Home = () => {
	return (
		<>
			<BackgroundAnimation />
			<div className="titles">
				<h1>Welcome to our meeting scheduling site!</h1>

				<h3>
					<TypingEffect
						text="Here you can schedule meetings with your friends and colleagues."
						delay={25}
					/>
				</h3>

				<h2>Please Login or Sign up here!</h2>
				<div className="login_area">
					<Link to="/register" className="links">
						Click here to sign up!
					</Link>
					<Link to="/login" className="links">
						Click here to login!
					</Link>
				</div>
			</div>
		</>
	);
};

export default Home;
