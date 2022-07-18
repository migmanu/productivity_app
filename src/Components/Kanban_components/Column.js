import { useContext } from "react";
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card'
import NewCard from './NewCard';
import styles from './kanban_styles.css'
import { KanbanContext } from '../../App.js'

const getColumnStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "rgb(240, 235, 235)",
  padding: 5,
  width: '100%',
  listStyle: 'none',
  maxHeight: '60%',
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
    <div className="kanbanColumn">
      <p className={titleStyle}> {title}</p>
      <div>
        <NewCard droppableId={droppableId} />
      </div>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <ul className="id" ref={provided.innerRef} {...provided.droppableProps} style={getColumnStyle(snapshot.isDraggingOver)}>
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
