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
    const taskObject = {
      content: newTask,
      date: new Date(),
      priority: Math.random() < 0.5,
    }

    axios
      .post('http://localhost:3001/tasks', taskObject)
      .then(response => {
        console.log('task saved to local server');
        setTasks(tasks.concat(response.data))
        setNewTask('')
      })
  }

  const handleForm = (event) => {
    setNewTask(event.target.value)
  }

  return (
    <div>
      <h1>My first productivity App</h1>
      <div>
        <form onSubmit={addTask}>
          <label htmlFor="input_task">Input task</label>&nbsp;
          <input type="text" id="input_task" value={newTask} onChange={handleForm}></input>&nbsp;
          <button type="submit">Submit task</button>
        </form>
        <h2>Current tasks</h2>
        <Tasks tasks={tasks} />
      </div>
    </div>
  )
}

export default App;
