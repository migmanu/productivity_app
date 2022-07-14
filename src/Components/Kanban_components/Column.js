import { useContext } from "react";
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card'
import NewCard from './NewCard';

import { KanbanContext } from '../../App.js'

const getColumnStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "rgb(240, 235, 235)",
  padding: 5,
  marginLeft: 70,
  marginRight: 10,
  width: 300,
  listStyle: 'none',
  height: 500,
  maxHeight: 500,
  overflowY: 'auto',
  overflowX: 'hidden'
});

const Column = (props) => {
  const { droppableId } = props
  const { tasks, setTasks } = useContext(KanbanContext);
  const columnTasks = tasks[droppableId]

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
    <div>
      <p className={titleStyle}> {title}</p>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <ul className="id" ref={provided.innerRef} {...provided.droppableProps} style={getColumnStyle(snapshot.isDraggingOver)}>
            <NewCard droppableId={droppableId} />
            {columnTasks.map(({ id, content, column }, index) => {
              return (
                <Card index={index} id={id} content={content} key={id} column={column} />
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>

  )
}

export default Column
