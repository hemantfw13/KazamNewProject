import React from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import img from "./assets/note.png"

function App() {
    return (
        <div className="main">
         <div className="app-container">
            <div style={{display:"flex", gap:"20px"}}>
                <img src={img} height="40px"/>
              <h1>Note App</h1>

            </div>
            <TaskList />
        </div>
        </div>
       
    );
}

export default App;
