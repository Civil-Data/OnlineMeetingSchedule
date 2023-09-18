import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";

const Booking = () => {
    return (
        <div className="titles">
            <Title title="Booking page" className="titles" />
            <TypingEffect
                text="Welcome to the booking page! Please enter your name and email to book a meeting."
                delay={25}
            />
        </div>
    );
};

export default Booking;
