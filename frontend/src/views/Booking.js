import TypingEffect from "../Components/TypingEffect";

const Booking = () => {
	return (
		<>
			<h1>Booking page</h1>
			<TypingEffect
				text="Welcome to the booking page! Please fill in length of the meeting."
				delay={25}
			/>
			<div>
				<label>
					<input type="checkbox" className="meetingLabel" />
					30 min meeting
					<br />
					<input type="checkbox" className="meetingLabel" />
					1h meeting
				</label>
				<div className="grid-container">
					<div className="item0">Month Year</div>
					<div className="item1">Monday</div>
					<div className="item1">Tuesday</div>
					<div className="item1">Wednesday</div>
					<div className="item1">Thursday</div>
					<div className="item1">Friday</div>
					<div className="item1">Saturday</div>
					<div className="item1">Sunday</div>
					<div className="item">1</div>
					<div className="item">2</div>
					<div className="item">3</div>
					<div className="item">4</div>
					<div className="item">5</div>
					<div className="item">6</div>
					<div className="item">7</div>
					<div className="item">8</div>
					<div className="item">9</div>
					<div className="item">10</div>
					<div className="item">11</div>
					<div className="item">12</div>
					<div className="item">13</div>
					<div className="item">13</div>
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
					<div className="item">31</div>
					<div className="item"></div>
					<div className="item"></div>
					<div className="item"></div>
				</div>
			</div>
		</>
	);
};

export default Booking;
