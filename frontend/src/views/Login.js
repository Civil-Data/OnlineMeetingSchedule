import Title from "../Components/Title";
import { Link } from "react-router-dom";
import AuthInput from "../Components/AuthInput";
import TypingEffect from "../Components/TypingEffect";
import LoginForm from "../Components/LoginForm";
import Validation from "../Components/Validation";

const Login = () => {
    return (
        <div className="titles">
            <Title title="Login page" />

            <TypingEffect
                text="Welcome back! Please login to your account."
                delay={25}
            />
            <div id="email-container" data-step-state="active">
                <LoginForm />
                {/* <LoginForm type="email" message="Enter your email" /> */}
                {/* <LoginForm type="password" message="Enter your password" /> */}
                {/* <Validation /> */}
                {/* <AuthInput message="Enter your email" type="email" />
                <AuthInput message="Enter your password" type="password" /> */}
            </div>
        </div>
    );
};

export default Login;
