import React, { useState, useEffect } from "react";

//components
import Tasks from './Components/Tasks';
import Timer from './Components/Timer';
import Pomodoro from './Components/Pomodoro'

//modules
import taskService from "./Services/tasks";

//styles
import styles from './timer_styles.module.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  //timer states
  const [minutes, setMinutes] = useState('25')
  const [seconds, setSeconds] = useState('00')
  const [isActive, setIsActive] = useState(false)
  const [counter, setCounter] = useState(5) //state used to count passed time in pomodoro cycle
  const [pomodoros, setPomodoros] = useState(0) //state used to count number of pomodoro cycles

  useEffect(() => {
    taskService
      .getAll()
      .then(response => {
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
      <div className={styles.container}>
        <Timer minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds}
        isActive={isActive} setIsActive={setIsActive} counter={counter} setCounter={setCounter}
        pomodoros={pomodoros} setPomodoros={setPomodoros} />
        <Pomodoro setCounter={setCounter} setMinutes={setMinutes} setSeconds={setSeconds} 
        isActive={isActive} setIsActive={setIsActive} pomodoros={pomodoros} setPomodoros={setPomodoros} />
      </div>
    </div>
  )
}

export default App;
