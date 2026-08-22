import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function prioritizeWithOpenAI(finalPrompt) {
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