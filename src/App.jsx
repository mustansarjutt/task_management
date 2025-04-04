import { useDispatch, useSelector } from "react-redux"
import AddTask from "./components/AddTask"
import Tasks from "./components/Tasks"
import { showAddTaskForm } from "./features/addTaskVisibility/taskVisibilitySlice"
import { clearAllTasks } from "./features/tasks/tasksSlice"

const App = () => {

  const visibility = useSelector(state => state.addTaskVisibility.showAddTask)
  const dispatch = useDispatch()

  const handleAddTaskForm = () => {
    dispatch(showAddTaskForm())
  }
  const handleDeleteTasks = () => {
    dispatch(clearAllTasks())
  }

  return (
    <div className="relative">
      <div className={`absolute top-14 w-full z-50 ${visibility ? "" : "hidden"}`}>
        <AddTask />
      </div>
      <div className="flex justify-between items-center h-16 bg-gradient-to-r from-blue-500 to-violet-800">
        <h1 className="text-center ml-3 text-2xl font-bold text-white">Task Management</h1>
        <input
          type="search"
          placeholder="Search tasks..."
          className="md:w-80 sm:w-60 w-40 px-4 py-2 rounded-3xl bg-gray-100 text-gray-800 shadow-sm outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all duration-300 mr-3"
        />
      </div>
      <div className="flex flex-row justify-center items-center h-16 bg-gray-400">
        <button onClick={handleDeleteTasks} className="mr-3 px-2 py-1 bg-red-600 text-white rounded-2xl cursor-pointer text-[15px]">Delete All</button>
        <button onClick={handleAddTaskForm} className="mr-3 px-2 py-1 bg-green-600 text-white rounded-2xl cursor-pointer text-[15px]">Add Task</button>
      </div>
      <Tasks />
    </div>
  )
}

export default App