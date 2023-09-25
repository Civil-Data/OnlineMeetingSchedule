import TypingEffect from "../Components/TypingEffect";
import LoginValidation from "../Components/LoginValidation";

const Login = () => {
    return (
        <div className="titles">
            <h1>Login page</h1>

            <TypingEffect
                text="Welcome back! Please login to your account."
                delay={25}
            />
            <div id="email-container" data-step-state="active">
                <LoginValidation />
            </div>
        </div>
    );
};

export default Login;
