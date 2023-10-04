import TypingEffect from "../Components/TypingEffect";
import SignUpValidation from "../Components/SignUpValidation";

const Register = () => {
    return (
        <div className="titles">
            <h1>Register page</h1>

            <TypingEffect
                text="Please enter your credentials to sign up."
                delay={25}
            />
            <div id="email-container" data-step-state="active">
                <SignUpValidation />
            </div>
        </div>
    );
};

export default Register;
