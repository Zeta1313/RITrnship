//Passes the prompt and tasks to the OpenAI API for prioritization, and returns the response. Heavily relies on the agent for actual content of the response.
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function prioritizeWithOpenAI(prompt, tasks) {
    const finalPrompt = `${prompt}\n\nTasks:\n${JSON.stringify(tasks)}`;

    const response = await client.responses.create({
        model: process.env.LLM_MODEL,
        input: finalPrompt,
        text: {
            format: {
                type: "json_schema",
                name: "task_prioritization",
                strict: true,
                schema: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string"
                            },
                            title: {
                                type: "string"
                            },
                            priority: {
                                type: "string",
                                enum: ["Critical", "High", "Medium", "Low"]
                            },
                            reason: {
                                type: "string"
                            }
                        },
                        required: ["id", "title", "priority", "reason"],
                        additionalProperties: false
                    }
                }
            }
        }
    });

    return JSON.parse(response.output_text);
}