import { useState } from "react";
import Login from "./components/Login";
import { getCalendars } from "./services/calendarApi";

function App() {
    const [accessToken, setAccessToken] = useState(null);
    const [calendars, setCalendars] = useState([]);
    const [message, setMessage] = useState("");

    async function handleLogin(token) {
        setAccessToken(token);

        try {
            const response = await getCalendars(token);

            if (!response.items || response.items.length === 0) {
                setMessage("This Google account doesn't have any calendars.");
                setCalendars([]);
                return;
            }

            setCalendars(response.items);
            setMessage(`Found ${response.items.length} calendar(s).`);

            console.log("Calendars:");
            console.log(response.items);
        } catch (error) {
            setCalendars([]);
            setMessage("Unable to retrieve calendars.");
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Calendar Task Manager</h1>

            {!accessToken ? (
                <Login onSuccess={handleLogin} />
            ) : (
                <p>Logged in!</p>
            )}

            {message && <p>{message}</p>}

            {calendars.length > 0 && (
                <>
                    <h2>Your Calendars</h2>

                    <ul>
                        {calendars.map((calendar) => (
                            <li key={calendar.id}>
                                <strong>{calendar.summary}</strong>

                                <br />

                                {calendar.primary ? "Primary Calendar" : "Secondary Calendar"}

                                <br />

                                <small>{calendar.id}</small>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default App;