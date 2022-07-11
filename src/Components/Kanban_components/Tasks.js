/* 
Currently simple component to display tasks in a list. Not needed for kanban
 */
const Tasks = (props) => {
    return (
        <div>
            <ul>
                {props.tasks.map(task => <li key={task.id}>{task.content} | Date: {task.date}</li>)}
            </ul>
        </div>
    )
}

export default Tasks