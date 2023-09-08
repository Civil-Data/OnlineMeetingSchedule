import React, { useState, useEffect } from "react";

const TypingEffect = ({ textToType }) => {
    const [text, setText] = useState("");
    const typingSpeed = 25; // Adjust typing speed (milliseconds per character)
    let charIndex = 0;

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (charIndex < textToType.length) {
                console.log(textToType[charIndex]);
                setText((prevText) => prevText + textToType.charAt(charIndex));
                charIndex++;
            } else {
                clearInterval(typingInterval); // Stop the typing animation when done
                const emailContainer =
                    document.getElementById("email-container");
                if (emailContainer) {
                    emailContainer.style.display = "block";
                    emailContainer.classList.add("fade_transition");
                }
            }
        }, typingSpeed);

        return () => {
            clearInterval(typingInterval); // Clean up the interval on component unmount
        };
    }, [textToType, charIndex]);

    return <p>{text}</p>;
};

export default TypingEffect;
