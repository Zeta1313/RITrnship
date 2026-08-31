//Handle prioritization requests from the client and communicate with the LLM service for processing. Most logic is downstream
import express from "express";
import { prioritizeTasks } from "../llm/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { prompt, tasks } = req.body;

        if (typeof prompt !== "string" || !prompt.trim()) {
            return res.status(400).json({ error: "Prompt must be a non-empty string." });
        }

        if (!Array.isArray(tasks) || tasks.length === 0) {
            return res.status(400).json({ error: "Task list must contain at least one task." });
        }

        const priorities = await prioritizeTasks(prompt, tasks);

        return res.json({ priorities });
    } catch (error) {
        console.error("Prioritization error:", error);

        if (error.name === "InvalidPriorityResponseError") {
            return res.status(502).json({ error: "LLM returned an invalid prioritization response." });
        }

        if (error.status === 429) {
            return res.status(429).json({ error: "LLM request was rate limited." });
        }

        return res.status(500).json({ error: "Unable to prioritize tasks." });
    }
});

export default router;