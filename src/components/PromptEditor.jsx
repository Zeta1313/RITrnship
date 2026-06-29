function PromptEditor({ prompt, onChange }) {
    return (
        <div>
            <label htmlFor="promptEditor">
                <h2>System Prompt</h2>
            </label>

            <textarea
                id="promptEditor"
                value={prompt}
                onChange={(e) => onChange(e.target.value)}
                rows={18}
                style={{
                    width: "100%",
                    resize: "vertical",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    padding: "1rem",
                    boxSizing: "border-box"
                }}
            />

            <p>
                Character Count: {prompt.length}
            </p>
        </div>
    );
}

export default PromptEditor;