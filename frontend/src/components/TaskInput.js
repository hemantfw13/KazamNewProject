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
            <button onClick={handleAddTask}> 
                
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11.5" fill="white" stroke="#914c1e" stroke-width="2"/>
    
    <path d="M12 6v12M6 12h12" stroke="#914c1e" stroke-width="2.5" stroke-linecap="round"/>
</svg>

                 Add</button>
        </div>
    );
};

export default TaskInput;
