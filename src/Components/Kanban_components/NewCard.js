import { useState } from "react";
import taskService from "../../Services/tasks";
import './kanban_styles.css'

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
  console.log('new card component init');
  const [addCard, setAddCard] = useState(false)
  const [newTask, setNewTask] = useState("")
  console.log('addCard is:', addCard);
  
  const submitNewCard = (event) => {
    console.log('submitNewCard form init');
  
    event.preventDefault()
      const taskObject = {
        content: newTask,
        date: new Date(),
        column: props.droppableId,
        position: 0
      }
  
      taskService
        .create(taskObject)
        .then(response => {
          console.log('task saved to local server');
        })
  }

  const handleClick = (event) => {
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
          <button>Add</button> <button onClick={handleClick}>Cancel</button>
        </div>
      </li>
    )
  }
}

export default NewCard