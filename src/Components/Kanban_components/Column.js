import { Droppable } from 'react-beautiful-dnd';
import Card from './Card'


const getColumnStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    width: 300,
    listStyle: 'none'
  });

const Column = (props) => {
    const { droppableId, tasks } = props

    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                    <ul className="id" ref={provided.innerRef} {...provided.droppableProps} style={getColumnStyle(snapshot.isDraggingOver)}>
                    {tasks.map(({id, content, column}, index) => {
                        return (
                            <Card index={index} id={id} content={content} key={id} column={column} />
                        );
                    })}
                    {provided.placeholder}
                </ul>
                )}
        </Droppable>
    )
}

export default Column