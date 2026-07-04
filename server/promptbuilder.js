export function buildPrompt(systemPrompt, tasks) {
    const today = new Date().toISOString();
    return `${systemPrompt}

The following tasks were extracted from the user's Google Calendar.

Tasks:
${JSON.stringify(tasks, null, 2)}

Return the tasks ordered from highest to lowest priority.

For each task include:
- title
- priority (Critical, High, Medium, or Low)
- reason

Today's date is ${today}. Use this to help determine the priority of each task.

Respond ONLY with valid JSON in the following format:

[
  {
    "title": "...",
    "priority": "...",
    "reason": "..."
  }
]`;
}