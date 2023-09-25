import React from "react";
import { v4 as uuid4 } from "uuid";

const Dropdown = ({ labelText, selectOptions, id }) => {
    return (
        <div key={uuid4()}>
            <label key={uuid4()} htmlFor={id}>
                {labelText}
            </label>
            <select key={uuid4()} id={id} className="dropdown">
                {selectOptions.map(option => {
                    return (
                        <option key={uuid4()} value={option}>
                            {option}
                        </option>
                    );
                })}
                {/* <option value="45min"> 45 Minutes</option>
                <option value="1h"> 1 Hour</option>
                <option value="2h"> 2 Hours</option> */}
            </select>
        </div>
    );
};

export default Dropdown;
