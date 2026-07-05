import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PromptEditor from "../components/PromptEditor";
import { DEFAULT_PROMPT } from "../prompts/defaultPrompt";
import { AuthProvider, useAuth } from "../services/AuthContext";

function PromptManager() {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [savedMessage, setSavedMessage] = useState("");
    const { accessToken, setAccessToken } = useAuth();

    useEffect(() => {
        const storedPrompt = localStorage.getItem("llmPrompt");

        if (storedPrompt) {
            setPrompt(storedPrompt);
        }
    }, []);

    function handleSave() {
        localStorage.setItem("llmPrompt", prompt);
        setSavedMessage("Prompt saved.");

        setTimeout(() => {
            setSavedMessage("");
        }, 2000);
    }

    function handleReset() {
        setPrompt(DEFAULT_PROMPT);
        localStorage.removeItem("llmPrompt");
        setSavedMessage("Default prompt restored.");

        setTimeout(() => {
            setSavedMessage("");
        }, 2000);
    }

    return (
        <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            <h1>AI Prompt Configuration</h1>

            <p>
                This prompt is sent to the language model before your calendar
                tasks are appended.
            </p>

            <PromptEditor
                prompt={prompt}
                onChange={setPrompt}
            />

            <div style={{ marginTop: "2rem" }}>
                <button onClick={handleSave}>
                    Save Prompt
                </button>

                <button
                    onClick={handleReset}
                    style={{ marginLeft: "1rem" }}
                >
                    Reset to Default
                </button>

                <Link
                    to="/"
                    style={{ marginLeft: "1rem" }}
                >
                    Return to Dashboard
                </Link>
            </div>

            {savedMessage && (
                <p style={{ marginTop: "1rem" }}>
                    {savedMessage}
                </p>
            )}

            <hr style={{ margin: "2rem 0" }} />

            <h2>Prompt Preview</h2>

            <p>
                The following information will be sent to the language model:
            </p>

            <pre
                style={{
                    whiteSpace: "pre-wrap",
                    background: "#f4f4f4",
                    padding: "1rem",
                    borderRadius: "5px"
                }}
            >
{`${prompt}

-------------------------
Task List
-------------------------

(The selected calendar tasks will be inserted here.)

-------------------------
Expected Output
-------------------------

Return the tasks ordered from highest to lowest priority with concise reasoning.`}
            </pre>
        </div>
    );
}

export default PromptManager;