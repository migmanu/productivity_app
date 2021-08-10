import axios from "axios";
import React, { useState, useEffect } from "react";

//components
import Tasks from './Components/Tasks'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    console.log('effect init');
    axios
      .get('http://localhost:3001/tasks')
      .then(response => {
        console.log('promised fulfilled');
        setTasks(response.data)
      })
  }, [])

  const addTask = (event) => {
    event.preventDefault()
    console.log('addTask init');
    
  }

  return (
    <div>
      <h1>My first productivity App</h1>
      <div>
        <form>
          <label htmlFor="input_task">Input task</label>
          <input type="text" id="input_task"></input>&nbsp;
          <input type="submit" value="Submit task"></input>
        </form>
        <h2>Current tasks</h2>
        <Tasks tasks={tasks} />
      </div>
    </div>
  )
}

export default App;
