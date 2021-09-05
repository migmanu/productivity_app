import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const KanbanContext = () => {

    const exampleArray = [
        {
            id: 1,
            task: 'do something today',
        },
        {
            id: 2,
            task: 'anything will do really',
        },
        {
            id: 3,
            task: 'please...',
        }
    ]

    const onDragEnd = (result) => {
        //
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <ul className="id" ref={provided.innerRef} {...provided.droppableProps}>
                    {exampleArray.map(({id, task}, index) => {
                        return (
                            <Draggable key={id} draggableId="Draggable" index={index}>
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