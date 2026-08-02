import { useState, useEffect } from "react";
import Login from "../components/Login";
import CalendarList from "../components/CalendarList";
import TaskList from "../components/TaskList";
import { getCalendars, getEvents } from "../services/calendarApi";
import { normalizeEvents } from "../utils/normalizeEvents";
import { useCalendar } from "../services/AuthContext";
import PrioritizeButton from "../components/PrioButton";
import PriorityList from "../components/PrioList";
import { prioritizeTasks } from "../services/llmApi";
import { DEFAULT_PROMPT } from "../prompts/defaultPrompt";

function Dashboard() {
    const {
        accessToken,
        setAccessToken,
        calendars,
        setCalendars,
        selectedCalendar,
        setSelectedCalendar,
        tasks,
        setTasks
    } = useCalendar();

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
        <main className="page stack-lg">
            <header className="page-header">
                <h1>Calendar Task Manager</h1>

                {!accessToken ? (
                    <Login onSuccess={handleLogin} />
                ) : (
                    <div className="alert alert-success">
                        Logged in successfully.
                    </div>
                )}

                {message && (
                    <div className="alert alert-info">
                        {message}
                    </div>
                )}

                {priorityError && (
                    <div className="alert alert-error">
                        {priorityError}
                    </div>
                )}
            </header>

            <div className="dashboard-grid">
                <aside className="stack">
                    <section className="card">
                        <h2>Calendars</h2>

                        <CalendarList
                            calendars={calendars}
                            selectedCalendar={selectedCalendar}
                            onSelect={handleCalendarSelect}
                        />
                    </section>

                    <section className="card">
                        <h2>AI Prioritization</h2>

                        {tasks.length > 0 ? (
                            <PrioritizeButton
                                onPrioritize={handlePrioritize}
                                disabled={prioritizing}
                                loading={prioritizing}
                            />
                        ) : (
                            <p>Select a calendar to begin.</p>
                        )}
                    </section>
                </aside>

                <section className="stack">
                    <div className="card">
                        <h2>Tasks</h2>

                        <TaskList tasks={tasks} />
                    </div>

                    {priorities.length > 0 && (
                        <div className="card">
                            <h2>Prioritized Tasks</h2>

                            <PriorityList priorities={priorities} />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Dashboard;