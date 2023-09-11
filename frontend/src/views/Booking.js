import TypingEffect from "../Components/TypingEffect";

const Booking = () => {
    return (
        <>
            <h1>Booking page</h1>;
            <TypingEffect
                text="Welcome to the booking page! Please enter your name and email to book a meeting."
                delay={25}
            />
        </>
    );
};

export default Booking;
