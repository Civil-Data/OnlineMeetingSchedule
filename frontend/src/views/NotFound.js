import React from "react";
import { Link } from "react-router-dom";
import TypingEffect from "../Components/TypingEffect";

const NotFound = () => {
	return (
		<div className="titles">
			<h1>404 - Not Found</h1>
			<TypingEffect text="The page you are looking for does not exist." delay={25} />
			<br />
			<Link className="links" id="confirmation_btn" to="/">
				Go Home
			</Link>
		</div>
	);
};

export default NotFound;
