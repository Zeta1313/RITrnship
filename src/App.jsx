import { useState } from "react";
import Login from "./components/Login";
import { getCalendars } from "./services/calendarApi";

async function handleLogin(token) {
    setAccessToken(token);

    try {
        const calendars = await getCalendars(token);

        if (!calendars.items || calendars.items.length === 0) {
            console.log("No calendars found for this account.");
            return;
        }

        console.log("Calendars:");
        console.log(calendars.items);
    } catch (error) {
        console.error(error);
    }
}

function App() {
    const [user, setUser] = useState(null);

    return (
        <>
            {!user ? (
                <Login onSuccess={setUser} />
            ) : (
                <h2>Logged In!</h2>
            )}
        </>
    );
}

export default App;