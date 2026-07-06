import { useState, useEffect } from "react";
import Login from "../components/Login";
import CalendarList from "../components/CalendarList";
import TaskList from "../components/TaskList";
import { getCalendars, getEvents } from "../services/calendarApi";
import { normalizeEvents } from "../utils/normalizeEvents";
import { useCalendar } from "../services/AuthContext";
import PrioritizeButton from "../components/PrioButton";
import PriorityList from "../components/PrioList";
import { prioritizeTasks } from "../services/API";
import { DEFAULT_PROMPT } from "../prompts/defaultPrompt";

function Dashboard() {
    const { accessToken, setAccessToken, calendars, setCalendars, selectedCalendar, setSelectedCalendar, tasks, setTasks } = useCalendar();
    const [message, setMessage] = useState("");
    const [priorities, setPriorities] = useState([]);
    const [prioritizing, setPrioritizing] = useState(false);
    const [priorityError, setPriorityError] = useState("");

    useEffect(() => {
        if (accessToken && calendars.length === 0) {
            loadCalendars(accessToken);
        }
    }, [accessToken]);

    function getActivePrompt() {
        return localStorage.getItem("llmPrompt") || DEFAULT_PROMPT;
    }

    async function handleLogin(token) {
        setAccessToken(token);
        await loadCalendars(token);
    }

    async function loadCalendars(token) {
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

    async function handlePrioritize() {
        setPrioritizing(true);
        setPriorityError("");

        try {
            const prompt = getActivePrompt();
            const response = await prioritizeTasks(prompt, tasks);
            setPriorities(response);
        } catch (error) {
            console.error(error);
            setPriorities([]);
            setPriorityError("Unable to prioritize tasks.");
        } finally {
            setPrioritizing(false);
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

            <CalendarList calendars={calendars} selectedCalendar={selectedCalendar} onSelect={handleCalendarSelect} />

            <TaskList tasks={tasks} />

            {tasks.length > 0 && (
                <PrioritizeButton
                    onPrioritize={handlePrioritize}
                    disabled={tasks.length === 0}
                    loading={prioritizing}
                />
            )}

            {priorityError && <p>{priorityError}</p>}

            <PriorityList priorities={priorities} />
        </div>
    );
}

export default Dashboard;