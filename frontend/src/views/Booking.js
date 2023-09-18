import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";
import Toggle from "../Components/ConfirmButton";

const Booking = () => {
    return (
        <div className="titles">
            <Title title="Booking page" className="titles" />
            <TypingEffect
                text="Welcome to the booking page! Please enter your name and email to book a meeting."
                delay={25}
            />
            <div className="login_area">
                <Toggle />
            </div>
        </div>
    );
};

export default Booking;
