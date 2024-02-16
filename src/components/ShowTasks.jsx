import { FaTimesCircle } from "react-icons/fa";

const ShowTasks = ({ tasks, setTasks }) => {
    console.log(tasks);
    const toggleDone = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, isDone: !task.isDone } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };
    return (
        <div>
            {tasks.map((task) => {
                const { id, task: text, day, isDone } = task;
                return (
                    <div
                        key={id}
                        className={`task ${isDone ? "done" : ""}`}
                        onDoubleClick={() => toggleDone(id)}
                    >
                        <h3>
                            {text}
                            <FaTimesCircle
                                style={{ color: "red" }}
                                onClick={() => deleteTask(id)}
                            />
                        </h3>
                        <h6>{day}</h6>
                    </div>
                );
            })}
        </div>
    );
};

export default ShowTasks;
