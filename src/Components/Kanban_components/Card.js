import { Draggable } from 'react-beautiful-dnd';

const grid = 8;

const getCardStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });

const Card = (props) => {
    console.log('Card component init');
    const { index, id, task } = props

    return(
        <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => (
                <li key={id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                style={getCardStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}>
                    <p>
                        { task }
                    </p>
                </li>
            )}
        </Draggable>
    )
}

export default Card