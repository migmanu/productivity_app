import taskService from "../../Services/tasks";

const grid = 8;

const getCardStyle = () => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
  });

const submitNewCard = (event) => {
  console.log('submitNewCard form init');

  event.preventDefault()
    const taskObject = {
      content: newTask,
      date: new Date(),
      priority: Math.random() < 0.5,
    }

    taskService
      .create(taskObject)
      .then(response => {
        console.log('task saved to local server');
        setTasks(tasks.concat(response.data))
        setNewTask('')
      })
}

  const NewCard = () => {
      console.log('new card component init');

      return (
        <div style={getCardStyle()}>
          <form onSubmit={submitNewCard}>

          </form>
        </div>
      )
  }

  export default NewCard