//Handles communication with the Google Calendar API, including fetching calendars and events. It uses the provided access token for authentication.
//In refactoring of CalendarAPI communication this will likely need heavy changes.
export async function getCalendars(accessToken) {
    const response = await fetch(
        "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch calendars");
    }

    return await response.json();
}

export async function getEvents(accessToken, calendarId) {
    const timeMin = new Date().toISOString();

    const url =
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events` +
        `?singleEvents=true` +
        `&orderBy=startTime` +
        `&timeMin=${encodeURIComponent(timeMin)}` +
        `&maxResults=20`;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Google API Error: ${response.status}`);
    }

    return await response.json();
}