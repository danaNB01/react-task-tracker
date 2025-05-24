import './App.css'
import {useState} from "react";
import { CiTrash } from "react-icons/ci";


function App() {
    const [tasks, setTasks] = useState([])
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDueDate, setTaskDueDate] = useState("")

    const addTask = (event) => {
        event.preventDefault()

        setTasks([...tasks, {
            id: Date.now(),
            title: taskTitle.trim(),
            dueDate: new Date(taskDueDate),
            completed: false
        }])
        setTaskTitle("")
        setTaskDueDate("")
    }

    function handleCompletion(id) {
      const updatedTasks =  tasks.map(task => {
          return task.id === id ? {...task, completed: !task.completed} : task
       })

        setTasks(updatedTasks)
    }

    function handleDeletion(id) {
        const updatedTasks = tasks.filter(task => task.id !== id)
        setTasks(updatedTasks)
    }

    // remove part so tasks added with today's date are not overdue.
    const isOverdue = (dueDate) =>{
        const today = new Date()
        // remove time part
        today.setHours(0,0,0,0)
        const due = new Date(dueDate)
        due.setHours(0,0,0,0)
        return due < today

    }
    return (
        <>
        <main>
            <form onSubmit={addTask}>
                <input type="text" placeholder="task title" name="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                <input type="date" placeholder="due date ex, 23-05-2025" name="task-due-date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                <button disabled={!taskTitle.trim() || !taskDueDate}>Add Task</button>
            </form>

            {tasks.length === 0 ? <p className='prompt-text'>No tasks added yet</p> :
                <ul className="tasks-list">
                    {[...tasks]
                        .sort((a, b) => a.dueDate - b.dueDate)
                        .map((task) => (
                        <li className={`item ${task.completed ? `completed` : null} ${isOverdue(task.dueDate) ? `overdue` : null}`} key={task.id}>
                            <span className="task-title" onClick={() => handleCompletion(task.id)}>{task.title}</span>
                            <span className="due-date">{task.dueDate.toDateString()}</span>
                            <span className="trash-icon" onClick={() => handleDeletion(task.id)}><CiTrash /></span>
                        </li>

                    ))}
                </ul>
            }

        </main>
            <footer>
                <p>Created by <a href="https://github.com/danaNB01" target="_blank" rel="noreferrer">Dana ✨</a></p>
            </footer>
            </>
    )
}

export default App
