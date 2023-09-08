import "./App.css";
import "./components";

function App() {
    return (
        <div className="App">
            <video
                src="../../src/video/vecteezy_on-a-black-background-yellow-smoke-spread-like-a-fire_2017728.mp4"
                autoplay
                loop
                muted
            ></video>
            <h1>Welcome to our meeting scheduling site!</h1>

            <h3>
                <p id="typing-element"></p>
            </h3>

            <h2>Please Login or Sign up here!</h2>
            <div class="login_area">
                <a href="register.html">Click here to register!</a>
                <a href="login.html">Click here to login!</a>
            </div>
        </div>
    );
}

export default App;
