function TaskList({ tasks }) {
    if (tasks.length === 0) {
        return null;
    }

    return (
        <div>
            <h2>Upcoming Tasks</h2>

            {tasks.map((task) => (
                <div
                    key={task.id}
                    style={{
                        border: "1px solid gray",
                        padding: "1rem",
                        marginBottom: "1rem"
                    }}
                >
                    <h3>{task.title}</h3>

                    <p>
                        <strong>Start:</strong> {task.start}
                    </p>

                    <p>
                        <strong>End:</strong> {task.end}
                    </p>

                    {task.location && (
                        <p>
                            <strong>Location:</strong> {task.location}
                        </p>
                    )}

                    {task.description && (
                        <p>{task.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TaskList;