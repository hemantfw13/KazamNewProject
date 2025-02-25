import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/taskService";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput"; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="task-container">
            <TaskInput onTaskAdded={getTasks} /> 
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <TaskItem key={index} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
