import TypingEffect from "../Components/TypingEffect";
import SignUpValidation from "../Components/SignUpValidation";

const SignUp = () => {
	return (
		<div className="titles">
			<h1>Sign up page</h1>

			<TypingEffect text="Please enter your credentials to sign up." delay={25} />
			<div id="email-container" data-step-state="active">
				<SignUpValidation />
			</div>
		</div>
	);
};

export default SignUp;
