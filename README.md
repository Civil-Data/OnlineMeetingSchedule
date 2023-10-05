[![Build/Test](https://github.com/Civil-Data/OnlineMeetingSchedule/actions/workflows/node.js.yml/badge.svg)](https://github.com/Civil-Data/OnlineMeetingSchedule/actions/workflows/node.js.yml)

# OnlineMeetingSchedule

This is an OnlineMeetingSchedule tool inspired by Calendly.
It is an easy way to book meetings, invite people and create event.
Participants can vote for a meeting and allowing for collaborative scheduling that takes everyone's availability into account.

# Frameworks

-   Nodejs
-   React
-   Express

# Database

-   MongoDB/Mongoose

# How to run

Follow these steps to set up and run the OnlineMeetingSchedule project on your local machine.

**1. Clone the project:**

```
git clone https://github.com/Civil-Data/OnlineMeetingSchedule.git
```

**2. Configure the backend:**

-   Go to the `backend` directory.
-   Create a new file called `.env`.
-   Add the following content to your `.env` file:

```
TOKEN_KEY ="thisisasecret"
DB_USER = "matildaronder"
DB_PASSWORD = "adlitamrendor123"
PORT = "5000"
CLIENT_PORT="3000"
```

**3. Start database:**

-   Go to the `backend` directory.
-   Run:

```
npm install
```

```
npm run dev
```

**4. Set up the Frontend:**

-   Go to the `frontend` directory.

**5. Install Dependencies:**

-   Run the following command to install all necessary modules and packages:

```
npm install
```

**6. Start the Application:**

-   Run the following command to start the app in development mode:

```
npm start
```

This will launch the application in your default web browser at [http://localhost:3000](http://localhost:3000).

**7. Sign Up and Use the Online Meeting App:**

Register an account to use our Online Meeting App.

Now, you're ready to explore the OnlineMeetingSchedule project locally!
