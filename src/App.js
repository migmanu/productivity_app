import React, { useState, useEffect } from "react";

//components
import Tasks from './Components/Tasks';
import Timer from "./Components/Timer";

//modules
import taskService from "./Services/tasks";

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  //timer states
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')
  const [isActive, setIsActive] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log('effect init');
    taskService
      .getAll()
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

    taskService
      .create(taskObject)
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
          <label htmlFor="input_task">Input task</label>{' '}
          <input type="text" id="input_task" value={newTask} onChange={handleForm}></input>{' '}
          <button type="submit">Submit task</button>
        </form>
        <h2>Current tasks</h2>
        <Tasks tasks={tasks} />
      </div>
      <br></br>
      <div>
        <Timer minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds}
        isActive={isActive} setIsActive={setIsActive} counter={counter} setCounter={setCounter} />
      </div>
    </div>
  )
}

export default App;
