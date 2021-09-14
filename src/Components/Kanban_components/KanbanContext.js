import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

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
    const exampleArray = [
            [
                {
                    id: "1",
                    task: 'do something today',
                },
                {
                    id: "2",
                    task: 'anything will do really',
                },
                {
                    id: "3",
                    task: 'please...',
                },
            ],
            [
                {
                    id: "4",
                    task: 'llevar anteojos',
                },
                {
                    id: "5",
                    task: 'llevar encendedor',
                },
                {
                    id: "6",
                    task: 'rax haceeee el check iiiiiiiiin',
                },
            ]
    ]

    const [characters, updateCharacters] = useState(exampleArray);

    //function to save list order after movement. Adding movement between lists
    const handleOnDragEnd = (result) => {
        console.log('handleOnDragEnd init. Result is:', result);
        const { source, destination } = result;

        if (!destination) return;

        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        console.log('sInd is:', sInd, 'dInd is: ', dInd);

        if (sInd === dInd) { //card moved inside same column
            const items = reorder(characters[sInd], source.index, destination.index);
            const newCharacters = [...characters];
            newCharacters[sInd] = items;
            updateCharacters(newCharacters);
          } else { //card moved to another column
            const result = move(characters[sInd], characters[dInd], source, destination);
            const newCharacters = [...characters];
            newCharacters[sInd] = result[sInd];
            newCharacters[dInd] = result[dInd];
      
            updateCharacters(newCharacters.filter(group => group.length));
          }
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Column droppableId="0" characters={characters[0]} />
            <Column droppableId="1" characters={characters[1]} />
        </DragDropContext>
    )
}

export default KanbanContext