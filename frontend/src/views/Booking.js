import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";

// import React, { useState } from "react";
import DateButtons from "../Components/DateButtons";

const Booking = () => {
	const dateLabels = [];
	const dates = 31;
	for (let index = 0; index < dates; index++) {
		dateLabels.push(<DateButtons date={index + 1} />);
	}
	// const [day, setDay] = useState(false);
	return (
		<>
			{/* <div class="viewShadow">
				<div class="dayView">
					<div className="calendarDate"> Monday 1st</div>
					<div className="time">
						<button>8:00</button>
						<button>9:00</button>
						<button>10:30</button>
						<button>12:00</button>
						<button>14:45</button>
					</div>
				</div>
			</div> */}
			<div>
				<div className="titles">
					<Title title="Booking page" className="titles" />
					<TypingEffect
						text="Welcome to the booking page! Please choose length of the meeting and choose a valid day to book a meeting."
						delay={25}
					/>
				</div>
				<div className="calender_area">
					<div>
						<label for="dropdown"> Please choose lenght: </label>
						<select id="dropdown">
							<option value="30 minutes"> 30 Minutes</option>
							<option value="45min"> 45 Minutes</option>
							<option value="1h"> 1 Hour</option>
							<option value="2h"> 2 Hours</option>
						</select>
						<label for="dropdown"> Please choose person: </label>
						<select id="dropdown">
							<option value="Martin"> Martin</option>
							<option value="Joel"> Joel</option>
							<option value="Matilda"> Matilda</option>
							<option value="Felix"> Felix</option>
						</select>
					</div>
					<div className="grid-container">
						<div className="month">Month Year</div>
						<div className="day">Monday</div>
						<div className="day">Tuesday</div>
						<div className="day">Wednesday</div>
						<div className="day">Thursday</div>
						<div className="day">Friday</div>
						<div className="day">Saturday</div>
						<div className="day">Sunday</div>
						{dateLabels}
					</div>
				</div>
			</div>
		</>
	);

	// import Toggle from "../Components/ConfirmButton";

	// const Booking = () => {
	//     return (
	//         <div className="titles">
	//             <Title title="Booking page" className="titles" />
	//             <TypingEffect
	//                 text="Welcome to the booking page! Please enter your name and email to book a meeting."
	//                 delay={25}
	//             />
	//             <div className="login_area">
	//                 <Toggle />
	//             </div>
	//         </div>
	//     );
};

export default Booking;
