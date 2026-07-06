export async function prioritizeTasks(prompt, tasks) {
    const response = await fetch("/api/prioritize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt,
            tasks
        })
    });

    if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json();
}