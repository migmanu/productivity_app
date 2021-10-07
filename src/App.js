import React, { useState, useEffect } from "react";

//components
import Timer from './Components/Pomodoro_components/Timer';
import Pomodoro from './Components/Pomodoro_components/Pomodoro'
import KanbanContext from './Components/Kanban_components/KanbanContext'
import Header from './Components/Header'

//modules
import taskService from "./Services/tasks";

//styles
import styles from './Components/Pomodoro_components/timer_styles.module.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  //Pomodoro timer states
  const [minutes, setMinutes] = useState('25')
  const [seconds, setSeconds] = useState('00')
  const [isActive, setIsActive] = useState(false)
  const [counter, setCounter] = useState(2) //used to count passed time in pomodoro cycle
  const [pomodoros, setPomodoros] = useState(0) //used to count number of pomodoro cycles
  const [corte, setCorte] = useState(true) //use to control when on pomodoro and when on break

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
      column: 0,
      date: new Date(),
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
      <div className={styles.container}>
        <Timer minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds}
        isActive={isActive} setIsActive={setIsActive} counter={counter} setCounter={setCounter} />
        <Pomodoro counter={counter} setCounter={setCounter} setMinutes={setMinutes} 
        setSeconds={setSeconds} isActive={isActive} setIsActive={setIsActive} 
        pomodoros={pomodoros} setPomodoros={setPomodoros} corte={corte} setCorte={setCorte} />
      </div>

      <div>
        <KanbanContext />
      </div>
    </div>
  )
}

export default App;
