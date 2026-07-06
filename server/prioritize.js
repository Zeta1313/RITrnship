import express from "express";
import { prioritizeTasks } from "../llm/llmService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { prompt, tasks } = req.body;

        if (!prompt) {
            return res.status(400).json({
                error: "Missing prompt."
            });
        }

        if (!Array.isArray(tasks) || tasks.length === 0) {
            return res.status(400).json({
                error: "Task list must contain at least one task."
            });
        }

        const priorities = await prioritizeTasks(prompt, tasks);

        res.json(priorities);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Unable to prioritize tasks."
        });
    }
});

export default router;