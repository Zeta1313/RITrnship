import { useState } from "react";
import Login from "../components/Login";
import CalendarList from "../components/CalendarList";
import TaskList from "../components/TaskList";
import { getCalendars, getEvents } from "../services/calendarApi";
import { normalizeEvents } from "../utils/normalizeEvents";

function Dashboard() {
    const [accessToken, setAccessToken] = useState(null);
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");

    async function handleLogin(token) {
        setAccessToken(token);

        try {
            const response = await getCalendars(token);

            if (!response.items || response.items.length === 0) {
                setCalendars([]);
                setMessage("No calendars were found.");
                return;
            }

            setCalendars(response.items);
            setMessage(`Found ${response.items.length} calendar(s).`);
        } catch (error) {
            console.error(error);
            setMessage("Unable to retrieve calendars.");
        }
    }

    async function handleCalendarSelect(calendar) {
        setSelectedCalendar(calendar);

        try {
            const response = await getEvents(accessToken, calendar.id);
            const normalizedTasks = normalizeEvents(response.items || []);
            setTasks(normalizedTasks);
        } catch (error) {
            console.error(error);
            setTasks([]);
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Calendar Task Manager</h1>

            {!accessToken ? (
                <Login onSuccess={handleLogin} />
            ) : (
                <p>Logged In</p>
            )}

            {message && <p>{message}</p>}

            <CalendarList
                calendars={calendars}
                selectedCalendar={selectedCalendar}
                onSelect={handleCalendarSelect}
            />

            <TaskList tasks={tasks} />
        </div>
    );
}

export default Dashboard;