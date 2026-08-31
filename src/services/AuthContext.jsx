//Handles the Authentication key and acess token for google, allowing the system to remember the user across page transitions. Also allows for manual logging out.
//Because of the necessity of intigrating it with Microsoft Copilot, this will likely need to be completely reworked, as at the moment it only functions when the program is directly runnning.
import { createContext, useContext, useEffect, useState } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem("accessToken") || null);
    const [calendars, setCalendars] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (accessToken) {
            sessionStorage.setItem("accessToken", accessToken);
        } else {
            sessionStorage.removeItem("accessToken");
        }
    }, [accessToken]);

    function logout() {
        setAccessToken(null);
        setCalendars([]);
        setSelectedCalendar(null);
        setTasks([]);
        sessionStorage.removeItem("accessToken");
    }

    return (
        <CalendarContext.Provider value={{ accessToken, setAccessToken, calendars, setCalendars, selectedCalendar, setSelectedCalendar, tasks, setTasks, logout }}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    return useContext(CalendarContext);
}