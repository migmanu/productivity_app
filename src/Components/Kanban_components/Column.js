import { useContext } from "react";
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card'
import NewCard from './NewCard';
import styles from './kanban_styles.css'
import { KanbanContext } from '../../App.js'

const getColumnStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "none",
  padding: 5,
  listStyle: 'none',
  maxHeight: '93%',
  overflowY: 'auto',
  overflowX: 'hidden'
});

const Column = (props) => {
  const { droppableId } = props
  const { tasks, setTasks } = useContext(KanbanContext);
  const columnTasks = tasks[droppableId]

  let title = ''
  if (droppableId === '0') {
    title = 'To-do'
  }
  if (droppableId === '1') {
    title = 'Doing'
  }
  if (droppableId === '2') {
    title = 'Done'
  }

  return (
    <div className="kanbanColumn">
      <p className="columnTitle"> {title}</p>
      <div>
        <NewCard droppableId={droppableId} />
      </div>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div className="listWrapper" ref={provided.innerRef} {...provided.droppableProps} >
            <ul className="id" style={getColumnStyle(snapshot.isDraggingOver)}>
              {columnTasks.map(({ id, content, column }, index) => {
                return (
                  <Card index={index} id={id} content={content} key={id} column={column} />
                );
              })}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>

  )
}

export default Column
