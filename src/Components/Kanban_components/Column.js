import { Droppable } from 'react-beautiful-dnd';
import Card from './Card'


const getColumnStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "rgb(240, 235, 235)",
    padding: 5,
    marginLeft: 70,
    marginRight: 10,
    width: 300,
    listStyle: 'none'
  });

const Column = (props) => {
    const { droppableId, tasks } = props

    let title = ''
    let titleStyle = ''
    if (droppableId === '0') {
        title = 'To-do'
        titleStyle = 'toDo'
    }
    if (droppableId === '1') {
        title = 'Doing'
        titleStyle = "doing"
    }
    if (droppableId === '2') {
        title = 'Done'
        titleStyle = "done"
    }

    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                    <ul className="id" ref={provided.innerRef} {...provided.droppableProps} style={getColumnStyle(snapshot.isDraggingOver)}>
                        <p className={titleStyle}>
                            {title}
                        </p>
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