import React, { useState, useEffect } from "react";

//Component for typing effect
const TypingEffect = ({ text, delay }) => {
    const [currentText, setCurrentText] = useState("");
    const [charIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (charIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + text[charIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, delay);

            // Clear the timeout when the component unmounts or when the character display is complete
            return () => clearTimeout(timeout);
        } else {
            const emailContainer = document.getElementById("email-container");
            if (emailContainer) {
                emailContainer.style.display = "block";
                emailContainer.classList.add("fade_transition");
            }
        }
    }, [charIndex, delay, text]);

    return <p>{currentText}</p>;
};

export default TypingEffect;
