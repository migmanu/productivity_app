import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

//import components
import Column from './Column';

//import services
import taskService from '../../Services/tasks';


//function to move cards between columns
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log('move function init');
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result; 
};

//function to reorder cards moved inside same column
const reorder = (list, startIndex, endIndex) => {
    console.log('reorder function init');
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const KanbanContext = () => {

    const [tasks, setTasks] = useState([[], []])

    useEffect(() => {
        taskService
          .getAll()
          .then(response => {
            setTasks(
                [
                    response.data.filter(task => task.column === 0),
                    response.data.filter(task => task.column === 1)
                ]
            )
          })
      }, [])


    const [characters, updateCharacters] = useState(tasks);

    //function to save list order after movement. Adding movement between lists
    const handleOnDragEnd = (result) => {
        console.log('handleOnDragEnd init. Result is:', result);
        const { source, destination } = result;

        if (!destination) return;

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        console.log('sInd is:', sInd, 'dInd is: ', dInd);

        if (sInd === dInd) { //card moved inside same column
            const items = reorder(tasks[sInd], source.index, destination.index);
            const newTasks = [...tasks];
            newTasks[sInd] = items;
            setTasks(newTasks);
          } else { //card moved to another column
            const result = move(characters[sInd], characters[dInd], source, destination);
            const newCharacters = [...characters];
            newCharacters[sInd] = result[sInd];
            newCharacters[dInd] = result[dInd];
      
            updateCharacters(newCharacters.filter(group => group.length));
          }
    }

    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Column droppableId="0" tasks={tasks[0]} />
                <Column droppableId="1" tasks={tasks[1]} />
            </DragDropContext>
        </div>
    )
}

export default KanbanContext