import React from "react";

const AuthInput = ({ message, type }) => {
    return (
        <div>
            <div>
                <label htmlFor={type}>
                    {message}
                    <b>*</b>
                </label>
            </div>
            <div>
                <input
                    id={type}
                    required=""
                    autoFocus="autofocus"
                    autoComplete="off"
                    data-target="text-suggester.input"
                    aria-describedby={`${type}-err`}
                    type={type}
                    name={`user[${type}]`}
                    spellCheck="false"
                />
                <input type="hidden" data-csrf="true" />
            </div>
        </div>
    );
};

export default AuthInput;
