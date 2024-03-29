import { Draggable } from 'react-beautiful-dnd';
import './kanban_styles.css';

const grid = 8;


const getCardStyle = (isDragging, draggableStyle, columnBorder) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  borderLeft: columnBorder,
  borderRadius: 5,

  // change background colour if dragging
  background: isDragging ? "lightgray" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const Card = (props) => {
  const { index, id, content, column } = props

  //blue for To-Do, green for Doing and red for Done
  let columnBorder = "5px solid black"

  if (column === 0) {
    columnBorder = "5px solid blue"
  }
  if (column === 1) {
    columnBorder = "5px solid green"
  }
  if (column === 2) {
    columnBorder = "5px solid red"
  }

  const handleDeleteCard = cardToDeleteId => {
    const cardToDelete = {
      id: cardToDeleteId
    }
  }

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <li key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
          style={getCardStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            columnBorder
          )}>
          <button className={"deleteCardButton"}></button>
          <p>
            {content}
          </p>
        </li>
      )}
    </Draggable>
  )
}

export default Card
