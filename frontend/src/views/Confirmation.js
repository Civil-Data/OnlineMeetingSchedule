import { Link } from "react-router-dom";
// import BackgroundAnimation from "../Components/BackgroundAnimation";
// import TypingEffect from "../Components/TypingEffect";

const Confirmation = () => {
    return (
        <>
            <div className="titles">
                <h1>Your meeting is now scheduled!</h1>
                <h3>
                    <p />
                    Name : Take username from login
                    <p />
                    Date : Take date from booking page
                    <p />
                    Time : Take time from booking page
                    <p />
                </h3>
            </div>

            <div className="login_area">
                <Link to="/booking" className="links">
                    soon_to_be_return_to_calendar{/* Return to Calendar */}
                </Link>
            </div>
        </>
    );
};

export default Confirmation;
