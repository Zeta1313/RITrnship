import { buildPrompt } from "../prompts/promptbuilder.js";
import { prioritizeWithOpenAI } from "./OpenAPI.js";

export async function prioritizeTasks(prompt, tasks) {
    const finalPrompt = buildPrompt(prompt, tasks);
    const response = await prioritizeWithOpenAI(finalPrompt);

    try {
        return JSON.parse(response);
    } catch (error) {
        console.error("Unable to parse LLM response:", response);
        throw new Error("LLM returned invalid JSON.");
    }
}