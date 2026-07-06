import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function prioritizeWithOpenAI(finalPrompt) {
    const response = await client.responses.create({
        model: process.env.LLM_MODEL,
        input: finalPrompt
    });

    return response.output_text;
}