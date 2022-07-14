import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

//components
import Column from './Column';

//modules
import taskService from '../../Services/tasks';

//styles
import './kanban_styles.css'

// context
import { KanbanContext } from '../../App.js'

//function to move cards between columns
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  let [removed] = sourceClone.splice(droppableSource.index, 1);
  removed.column = parseInt(droppableDestination.droppableId) //update card's column field

  destClone.splice(droppableDestination.index, 0, removed); //move card to new column

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  taskService
    .update(removed)
    .then(
      console.log('edit called')
    )

  return result;
};

//function to reorder cards moved inside same column
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

//update indexes in server after card movement between or into columns
const updateIndex = (newTasks, columnNumber) => {
  let index = 1

  newTasks[columnNumber].forEach(task => {
    if (index < newTasks[columnNumber].length) {
      const newTask = {
        id: task.id,
        content: task.content,
        date: task.date,
        column: columnNumber,
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
}


const KanbanWrapper = () => {
  const { tasks, setTasks} = useContext(KanbanContext);

  


  //function to save list order after movement. Adding movement between lists
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) { //card moved inside same column
      const items = reorder(tasks[sInd], source.index, destination.index);
      const newTasks = [...tasks];
      newTasks[sInd] = items;
      updateIndex(newTasks, sInd)
      setTasks(newTasks);
    } else { //card moved to another column
      const result = move(tasks[sInd], tasks[dInd], source, destination);
      const newTasks = [...tasks];
      newTasks[sInd] = result[sInd];
      newTasks[dInd] = result[dInd];

      updateIndex(newTasks, sInd)
      updateIndex(newTasks, dInd)

      setTasks(newTasks)


    }
  }

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Column droppableId="0" tasks={tasks[0]} setTasks={setTasks} />
        <Column droppableId="1" tasks={tasks[1]} setTasks={setTasks} />
        <Column droppableId="2" tasks={tasks[2]} setTasks={setTasks} />
      </DragDropContext>
    </div>
  )
}

export default KanbanWrapper
