function CalendarList({ calendars, selectedCalendar, onSelect }) {
    if (calendars.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>Your Calendars</h2>

            <ul>
                {calendars.map((calendar) => (
                    <li
                        key={calendar.id}
                        onClick={() => onSelect(calendar)}
                        style={{
                            cursor: "pointer",
                            marginBottom: "1rem",
                            fontWeight:
                                selectedCalendar?.id === calendar.id
                                    ? "bold"
                                    : "normal"
                        }}
                    >
                        {calendar.summary}

                        {calendar.primary && (
                            <span> (Primary)</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CalendarList;