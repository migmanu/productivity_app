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
  width: 265,
  maxWidth: 265,
  minWidth: 265,
  maxHeight: 200,
  minHeight: 20,
  overflowY: 'scroll',
  overflowX: 'hidden'
});

const NewCard = (props) => {
  const { droppableId } = props
  const { tasks, setTasks } = useContext(KanbanContext);
  console.log('new card component init');
  const [addCard, setAddCard] = useState(false)
  const [newTask, setNewTask] = useState("")
  console.log('addCard is:', addCard);

  const handleSubmitNewCard = (event) => {
    console.log('submitNewCard form init');

    event.preventDefault()
    const taskObject = {
      content: newTask,
      date: new Date(),
      column: droppableId,
      position: 0
    }

    const newTasksArray = tasks
    console.log(`newTasksArray is ${newTasksArray}`)

    let newCardID

    taskService
      .create(taskObject)
      .then(response => {
        console.log('task saved to local server');
        console.log(`response is: ${response}`)
        setAddCard(false)
        console.log(` addCard is now: ${addCard}`)
        newCardID = response.id
        console.log(`new id is ${response}`)
      })
    taskService
      .getAll()
      .then(response => {
        console.log(response);
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
  }

  const handleClick = (event) => {
    // function used solely to change the state of addCard and thus display or hide the NewCard text filed.
    event.preventDefault()
    console.log('handleClick function init, addCard is: ', addCard);
    setAddCard(!addCard)
  }

  const handleChange = (event) => {
    setNewTask(event.target.value)
  }

  if (addCard === false) {
    return (
      <li><button onClick={handleClick} className='addCardButton'></button></li>
    )
  }

  if (addCard === true) {
    console.log('newTask.length is: ', newTask.length, 'operand: ', Math.ceil(newTask.length / 33))
    return (
      <li>
        <button onClick={handleClick} className='addCardButton'></button>
        <div>
          <textarea type="textarea" style={getCardStyle()} rows={
            (newTask.length === 0) ? 1 : Math.ceil(newTask.length / 33)}
            placeholder='New task...' onChange={handleChange}></textarea>
          <button onClick={handleSubmitNewCard} className="submitCardButton">Add</button> <button onClick={handleClick}>Cancel</button>
        </div>
      </li>
    )
  }
}

export default NewCard
