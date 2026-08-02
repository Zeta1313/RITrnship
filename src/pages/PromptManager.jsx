import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PromptEditor from "../components/PromptEditor";
import { DEFAULT_PROMPT } from "../prompts/defaultPrompt";

function PromptManager() {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const [savedMessage, setSavedMessage] = useState("");

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
        <main className="page stack-lg">
            <header className="page-header">
                <h1>AI Prompt Configuration</h1>

                <p>
                    This prompt is sent to the language model before your
                    calendar tasks are appended.
                </p>
            </header>

            {savedMessage && (
                <div className="alert alert-success">
                    {savedMessage}
                </div>
            )}

            <section className="card stack">
                <h2>Prompt Editor</h2>

                <PromptEditor
                    prompt={prompt}
                    onChange={setPrompt}
                />

                <div className="section-actions">
                    <button onClick={handleSave}>
                        Save Prompt
                    </button>

                    <button
                        className="button-secondary"
                        onClick={handleReset}
                    >
                        Reset to Default
                    </button>

                    <Link
                        className="button-secondary"
                        to="/"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </section>

            <section className="card stack">
                <h2>Prompt Preview</h2>

                <p>
                    The following information will be sent to the language model.
                </p>

                <pre className="prompt-preview">
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
            </section>
        </main>
    );
}

export default PromptManager;