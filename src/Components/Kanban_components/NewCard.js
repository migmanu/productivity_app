import { useState, useContext } from "react";
import taskService from "../../Services/tasks.js";
import './kanban_styles.css'

import { KanbanContext } from '../../App.js'

const grid = 8;


const getCardStyle = (height) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: 5,
  overflowY: 'scroll',
  overflowX: 'hidden'
});

const updateIndex = (tasksList, id) => {
  console.log(`taskList to update is: ${JSON.stringify(tasksList)}`)
  let index = 1

  tasksList.forEach(task => {
    if (task.id !== id) {
      const newTask = {
        id: task.id,
        content: task.content,
        date: task.date,
        column: task.column,
        position: index
      }
      taskService
        .update(newTask)
        .then(
          console.log(`task ${newTask.content} updated with position ${newTask.position} `)
        )

      index += 1
    }
  })
  console.log(`updates taskList: ${JSON.stringify(tasksList)}`)
}


const NewCard = (props) => {
  const { droppableId } = props
  const { tasks, setTasks } = useContext(KanbanContext);
  const [addCard, setAddCard] = useState(false)
  const [newTask, setNewTask] = useState("")

  const handleSubmitNewCard = (event) => {

    if (newTask.length === 0) {
      console.log("submitted new card with no content")
      alert("No content submitted to new card")
      return
    }

    event.preventDefault()
    const taskObject = {
      content: newTask,
      date: new Date(),
      column: droppableId,
      position: 0
    }

    let newCardID

    taskService
      .create(taskObject)
      .then(response => {
        console.log('task saved to local server');
        setAddCard(false)
        newCardID = response.id
        let tasksCopy = tasks;
        tasksCopy[droppableId].unshift(taskObject)
        console.log(`taskcopy: ${JSON.stringify(tasksCopy[droppableId])}`)

        taskService
          .getAll()
          .then(response => {
            console.log(`droppableId: ${droppableId}`)
            let tasksFetched = response.data
            console.log(`tasksFetched before filter: ${JSON.stringify(tasksFetched)}`)
            tasksFetched.filter(task => task.column === droppableId);
            tasksFetched.sort((a, b) => a.position - b.position)
            console.log(`tasksFetched: ${JSON.stringify(tasksFetched)}`)
            updateIndex(tasksFetched, newCardID)

            taskService
              .getAll()
              .then(response => {
                console.log(`newCard getAll init`)
                let toDo = response.data.filter(task => task.column === 0)
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
              }
              )

          })



      })

  }

  const handleClick = (event) => {
    // function used solely to change the state of addCard and thus display or hide the NewCard text filed.
    event.preventDefault()
    setAddCard(!addCard)
  }

  const handleChange = (event) => {
    setNewTask(event.target.value)
  }

  if (addCard === false) {
    return (
      <div><button onClick={handleClick} className='addCardButton'>+</button></div>
    )
  }

  if (addCard === true) {
    return (
      <div className="newCardWrapper">
        <textarea type="textarea" rows={
          (newTask.length === 0) ? 1 : Math.ceil(newTask.length / 33)}
          placeholder='New task...' onChange={handleChange}></textarea>
        <button onClick={handleSubmitNewCard} className="submitCardButton">Add</button> <button onClick={handleClick}>Cancel</button>
      </div>
    )
  }
}

export default NewCard
