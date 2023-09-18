import Title from "../Components/Title";
import { Link } from "react-router-dom";
import BackgroundAnimation from "../Components/BackgroundAnimation";
import TypingEffect from "../Components/TypingEffect";

const Home = () => {
    return (
        <div className="titles">
            <BackgroundAnimation />

            <Title title="Welcome to our meeting scheduling site!" />

            <h3>
                <TypingEffect
                    text="Here you can schedule meetings with your friends and colleagues."
                    delay={25}
                />
            </h3>

<<<<<<< HEAD
			<h2>Please Login or Sign up here!</h2>
			<div className="login_area">
				<Link to="/Register" className="links">
					Click here to register!
				</Link>
				<Link to="/login" className="links">
					Click here to login!
				</Link>
				<Link to="/confirmation" className="links">
					confirmation_page_test
				</Link>

			</div>
		</>
	);
=======
            <h2>Please Login or Sign up here!</h2>
            <div className="login_area">
                <Link to="/register" className="links">
                    Click here to register!
                </Link>
                <Link to="/login" className="links">
                    Click here to login!
                </Link>
            </div>
        </div>
    );
>>>>>>> 733b23f3b4465379e7b1e26fb50850be9bdfae23
};

export default Home;
