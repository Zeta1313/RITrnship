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