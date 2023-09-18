import Title from "../Components/Title";
import { Link } from "react-router-dom";
import TypingEffect from "../Components/TypingEffect";

const Booking = () => {
    return (
        <div className="titles">
            <Title title="Booking page" className="titles" />
            <TypingEffect
                text="Welcome to the booking page! Please enter your name and email to book a meeting."
                delay={25}
            />
                <div className="login_area">
                <Link to="/confirmation" className="links">
                    to_confirmation_page{/* Return to Calendar */}
                </Link>
            </div>    
        </div>
    );
};

export default Booking;
