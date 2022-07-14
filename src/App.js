import React, { useState, useEffect, useReducer, createContext } from "react";

//components
import Pomodoro from './Components/Pomodoro_components/Pomodoro'
import KanbanWrapper from './Components/Kanban_components/KanbanWrapper'

//modules
import taskService from "./Services/tasks";

//styles
import './App.css'

// manage kanban context
export const KanbanContext = createContext();

function reducer(state, item) {
  return [...state, item]
}

const App = () => {
  const [tasks, setTasks] = useReducer([])

  return (
    <div className="body">
      <div>
        <Pomodoro />
      </div>
      <div>
        <KanbanWrapper />
      </div>
    </div>
  )
}

export default App;
