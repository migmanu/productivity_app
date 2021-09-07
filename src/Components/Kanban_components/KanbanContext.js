import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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


    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(characters)
        const [reorderItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderItem)

        updateCharacters(items)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <ul className="id" ref={provided.innerRef} {...provided.droppableProps}>
                    {characters.map(({id, task}, index) => {
                        return (
                            <Draggable key={id} draggableId={id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <p>
                                            { task }
                                        </p>
                                    </li>
                                )}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default KanbanContext