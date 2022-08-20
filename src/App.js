import React, { useState, useEffect, useReducer, createContext } from "react";

//components
import Pomodoro from './Components/Pomodoro_components/Pomodoro'
import KanbanWrapper from './Components/Kanban_components/KanbanWrapper'

//styles
import './App.css'

import taskService from './Services/tasks.js';


// manage kanban context
export const KanbanContext = createContext();


const App = () => {
  const [tasks, setTasks] = useState([[], [], []])

  useEffect(() => {
    taskService
      .getAll()
      .then(response => {
        console.log(`response is ${JSON.stringify(response.data)}`)
        const toDo = response.data.filter(task => task.column === 0)
        toDo.sort((a, b) => a.position - b.position)

        const doing = response.data.filter(task => task.column === 1)
        doing.sort((a, b) => a.position - b.position)

        const done = response.data.filter(task => task.column === 2)
        done.sort((a, b) => a.position - b.position)
        setTasks(
          [
            toDo,
            doing,
            done
          ]
        )
      })
  }, [])

  console.log(`app.js tasks set to: ${JSON.stringify(tasks)}`)


  return (
    <div className="body">
      <div>
        <Pomodoro />
      </div>
      <KanbanContext.Provider value={{ tasks, setTasks }}>
        <KanbanWrapper />
      </KanbanContext.Provider>
    </div>
  )
}

export default App;
