//Checks for faulty input and as well as output from the LLM, and delegates to OpenAPI.js for actual communication with the LLM.
import { prioritizeWithOpenAI } from "./OpenAPI.js";

const VALID_PRIORITIES = new Set(["Critical", "High", "Medium", "Low"]);

export class InvalidPriorityResponseError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidPriorityResponseError";
    }
}

export async function prioritizeTasks(prompt, tasks) {
    const response = await prioritizeWithOpenAI(prompt, tasks);

    if (!Array.isArray(response)) {
        throw new InvalidPriorityResponseError("Prioritization response must be an array.");
    }

    const taskIds = new Set(tasks.map((task) => task.id));

    for (const item of response) {
        if (!item || typeof item !== "object") {
            throw new InvalidPriorityResponseError("Each priority must be an object.");
        }

        if (typeof item.id !== "string" || !taskIds.has(item.id)) {
            throw new InvalidPriorityResponseError("Each priority must reference a valid task ID.");
        }

        if (typeof item.title !== "string" || !item.title.trim()) {
            throw new InvalidPriorityResponseError("Each priority must contain a title.");
        }

        if (!VALID_PRIORITIES.has(item.priority)) {
            throw new InvalidPriorityResponseError("Each priority must use a valid priority level.");
        }

        if (typeof item.reason !== "string" || !item.reason.trim()) {
            throw new InvalidPriorityResponseError("Each priority must contain a reason.");
        }
    }

    if (response.length !== tasks.length) {
        throw new InvalidPriorityResponseError("The LLM must return exactly one priority for every task.");
    }

    return response;
}