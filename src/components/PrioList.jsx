function PriorityList({ priorities }) {
    if (priorities.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>AI Task Priorities</h2>

            {priorities.map((task, index) => (
                <div key={`${task.title}-${index}`}>
                    <h3>
                        {index + 1}. {task.title}
                    </h3>

                    <p>
                        <strong>Priority:</strong> {task.priority}
                    </p>

                    <p>
                        <strong>Reason:</strong> {task.reason}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default PriorityList;