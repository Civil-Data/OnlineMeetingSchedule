document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-element");
    let textToType = "";
    const typingSpeed = 25; // Adjust typing speed (milliseconds per character)

    let charIndex = 0;

    function typeNextCharacter() {
        if (document.title == "Login") {
            textToType = "Welcome back! Please login to your account.";
        } else if (document.title == "Registration page") {
            textToType =
                "Welcome to our registration site! Let's create your account!";
        } else if (document.title == "Online Meeting Scheduler") {
            textToType =
                "Here you can schedule meetings with your friends and colleagues.";
        } else if (document.title == "Profile page") {
            textToType = "Here you can view and edit your profile.";
        }
        if (charIndex < textToType.length) {
            textElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeNextCharacter, typingSpeed);
        } else {
            // Typing is complete, show the email-container div
            const emailContainer = document.getElementById("email-container");
            emailContainer.style.display = "block";
            emailContainer.classList.add("fade_transition");
        }
    }
    // Start typing when the page loads
    typeNextCharacter();
});
