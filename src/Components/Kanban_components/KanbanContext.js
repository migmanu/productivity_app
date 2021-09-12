import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Column from './Column';

const KanbanContext = () => {
    const exampleArray = [
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
            }
    ]

    const [characters, updateCharacters] = useState(exampleArray);

    //function to save list order after movement
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(characters) //for now only works with first list toDo
        const [reorderItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderItem)

        updateCharacters(items)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Column droppableId="testToDo" characters={characters} />
        </DragDropContext>
    )
}

export default KanbanContext