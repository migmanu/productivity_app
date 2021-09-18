import { Droppable } from 'react-beautiful-dnd';
import Card from './Card'

const grid = 8;

const getColumnStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
    listStyle: 'none'
  });

const Column = (props) => {
    console.log('Column component init');
    const { droppableId, characters } = props

    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                    <ul className="id" ref={provided.innerRef} {...provided.droppableProps} style={getColumnStyle(snapshot.isDraggingOver)}>
                    {characters.map(({id, task}, index) => {
                        console.log('Card component called by Column');
                        return (
                            <Card index={index} id={id} task={task} key={id} />
                        );
                    })}
                    {provided.placeholder}
                </ul>
                )}
        </Droppable>
    )
}

export default Column