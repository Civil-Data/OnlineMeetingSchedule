import React from "react";
import { v4 as uuid4 } from "uuid";

//Dropdown component
const Dropdown = ({ labelText, selectOptions, id }) => {
	return (
		<div key={uuid4()}>
			<label key={uuid4()} htmlFor={id}>
				{labelText}
			</label>
			<select key={uuid4()} id={id} className="dropdown">
				{selectOptions.map((option) => {
					return (
						<option key={uuid4()} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Dropdown;
