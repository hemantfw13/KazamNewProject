import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";

function App() {
    return (
        <div className="app-container">
            <h1>Note App</h1>
            <TaskList />
        </div>
    );
}

export default App;
