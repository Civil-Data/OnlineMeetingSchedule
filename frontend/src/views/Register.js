import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";
import SignUpValidation from "../Components/SignUpValidation";

const Register = () => {
    return (
        <div className="titles">
            <Title title="Register page" className="titles" />

            <TypingEffect
                text="Please enter your email and a password to sign up."
                delay={25}
            />
            <div id="email-container" data-step-state="active">
                <SignUpValidation />
            </div>
        </div>
    );
};

export default Register;
