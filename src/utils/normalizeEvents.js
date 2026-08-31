//Buffer file to ensure that events fetched from the Google Calendar API are in a consistent format for the rest of the application. It normalizes the event data to include only the necessary fields.
export function normalizeEvents(events) {
    return events.map((event) => ({
        id: event.id,
        title: event.summary || "Untitled Event",
        description: event.description || "",
        start: event.start?.dateTime || event.start?.date || "",
        end: event.end?.dateTime || event.end?.date || "",
        location: event.location || ""
    }));
}