import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";
import Toggle from "../Components/ConfirmButton";
import { useLoginStatusContext } from "../contexts/LoginContext";
// import ProfileContacts from "../Components/Profile/ProfileContacts";
// import ProfileInformation from "../Components/Profile/ProfileInformation";
// import ProfileTab from "../Components/Profile/ProfileTab";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddSharpIcon from "@mui/icons-material/PersonAddSharp";

const Booking = () => {
    const loginStatusContext = useLoginStatusContext();
    console.log(loginStatusContext);

    return (
        <>
            {/* <div className="login_status">
                {loginStatusContext === "Logged in"
                    ? "Martin is logged in"
                    : ""}
            </div> */}
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
            {loginStatusContext === "martin@ju.se" ? (
                <PersonAddSharpIcon />
            ) : (
                <EditIcon />
            )}

            {/* <ProfileTab
                tab_text="Profile information"
                is_active={loginStatusContext === "info"}
                tab_name="info"
            />
            <ProfileTab
                tab_text="Contacts"
                is_active={loginStatusContext === "contacts"}
                tab_name="contacts"
            />
            {loginStatusContext === "info" ? (
                <ProfileInformation />
            ) : (
                <ProfileContacts />
            )} */}
        </>
    );
};

export default Booking;
