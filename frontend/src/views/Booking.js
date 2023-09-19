import Title from "../Components/Title";
import TypingEffect from "../Components/TypingEffect";
import React, { useState } from "react";
import DateButtons from "../Components/DateButtons";

function Day() {
	return (
		<div className="day">
			<div> Day 22nd </div>
			<div> 8:00</div>
			<div> 10:30</div>
			<div> 13:00</div>
			<div> 15:00</div>
		</div>
	);
}

const Booking = () => {
	const dateLabels = [1];
	const [day, setDay] = useState(false);
	return (
		<>
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
					{dateLabels.map((item, index) => (
						<DateButtons></DateButtons>
					))}

					{/* <button className="dates">1</button> */}
					{/* <div className="item">1</div> */}
					{/* <button className="dates">2</button> */}
					{/* <div className="item">2</div> */}
					{/* <button className="dates">3</button> */}
					{/* <div className="item">3</div> */}
					{/* <button className="dates">4</button> */}
					{/* <div className="item">4</div> */}
					{/* <button className="dates">5</button> */}
					{/* <div className="item">5</div> */}
					{/* <button className="dates">6</button>
					<button className="dates">7</button>
					<button className="dates">8</button>
					<button className="dates">9</button>
					<button className="dates">10</button>
					<button className="dates">11</button>
					<button className="dates">12</button>
					<button className="dates">13</button>
					<button className="dates">14</button>
					<button className="dates">15</button>
					<button className="dates">16</button>
					<button className="dates">17</button>
					<button className="dates">18</button>
					<button className="dates">19</button>
					<button className="dates">20</button>
					<button className="dates">21</button>
					<button className="dates">22</button>
					<button className="dates">23</button>
					<button className="dates">24</button>
					<button className="dates">25</button>
					<button className="dates">26</button>
					<button className="dates">27</button>
					<button className="dates">28</button>
					<button className="dates">29</button>
					<button className="dates">30</button>
					<button
						onClick={() => {
							// Day();
							setDay((prevDay) => !prevDay);
							console.log("I was pressed");
						}}
					>
						31
					</button>
					{day ? (
						<div className="day">
							<div> Day 22nd </div>
							<div> 8:00</div>
							<div> 10:30</div>
							<div> 13:00</div>
							<div> 15:00</div>
						</div>
					) : (
						<></>
					)} */}

					{/* <div className="item">6</div>
					<div className="item">7</div>
					<div className="item">8</div>
					<div className="item">9</div>
					<div className="item">10</div>
					<div className="item">11</div>
					<div className="item">12</div> */}
					{/* <div className="item">13</div>
					<div className="item">14</div>
					<div className="item">15</div>
					<div className="item">16</div>
					<div className="item">17</div>
					<div className="item">18</div>
					<div className="item">19</div>
					<div className="item">20</div>
					<div className="item">21</div>
					<div className="item">22</div>
					<div className="item">23</div>
					<div className="item">24</div>
					<div className="item">25</div>
					<div className="item">26</div>
					<div className="item">27</div>
					<div className="item">28</div>
					<div className="item">29</div>
					<div className="item">30</div>
					<div className="item">31</div> */}
					{/* <div className="item"></div>
					<div className="item"></div>
					<div className="item"></div> */}
				</div>
			</div>
		</>
	);
};
// function Day() {
// 	const [day, setDay] = useState("Monday");
// 	return (
// 		<div>
// 			<button type="button" onClick={() => Day("Monday")}>
// 				Monday
// 			</button>
// 		</div>
// 	);
// }
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Day />);

export default Booking;
