function PrioritizeButton({ onPrioritize, disabled, loading }) {
    return (
        <button onClick={onPrioritize} disabled={disabled || loading}>
            {loading ? "Prioritizing..." : "Prioritize Tasks"}
        </button>
    );
}

export default PrioritizeButton;