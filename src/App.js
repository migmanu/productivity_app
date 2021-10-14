import React, { useState, useEffect } from "react";

//components
import Pomodoro from './Components/Pomodoro_components/Pomodoro'
import KanbanContext from './Components/Kanban_components/KanbanContext'

//modules
import taskService from "./Services/tasks";

//styles
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    taskService
      .getAll()
      .then(response => {
        setTasks(response.data)
      })
  }, [])

  const addTask = (event) => { //left only to copy later
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

  return (
    <div className="body">
      <div>
        <Pomodoro />
      </div>
      <div>
        <KanbanContext />
      </div>
    </div>
  )
}

export default App;
