//Buffer file between the front-end and the server, handles communication with the server's prioritization endpoint.
export async function prioritizeTasks(prompt, tasks) {
    const response = await fetch("/api/prioritize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, tasks })
    });

    if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.priorities)) {
        throw new Error("Server returned an invalid prioritization response.");
    }

    return data.priorities;
}