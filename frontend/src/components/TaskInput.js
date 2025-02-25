import React, { useState } from "react";
import { addTask } from "../services/taskService";

const TaskInput = ({ onTaskAdded }) => {
    const [task, setTask] = useState("");

    const handleAddTask = async () => {
        if (task.trim() === "") return;

        await addTask(task);
        setTask(""); 
        onTaskAdded(); 
    };

    return (
        <div className="task-input-container">
            <input
                type="text"
                placeholder="New Task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAddTask}>➕ Add</button>
        </div>
    );
};

export default TaskInput;
