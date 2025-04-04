import { useSelector } from "react-redux"
import Task from "../utils/Task"
import ReactPaginate from "react-paginate"
import { useState } from "react"

const Tasks = () => {
    const tasks = useSelector(state => state.tasks?.tasks)
    const tasksPerPage = 3
    const [currentPage, setCurrentPage] = useState(0)

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected)
    }

    const displayedTasks = tasks.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage)

    return (
        <div className="flex flex-col gap-y-2 items-center justify-center w-full bg-gray-300 p-3">
            <h1 className="text-slate-700 font-bold font-sans text-center text-3xl">Tasks</h1>
            <div className="w-full">
                {tasks.length === 0 ? (
                    <p className="text-gray-500 text-center">No tasks available. Please add tasks.</p>
                ) : (
                    displayedTasks.map((task) => (
                        <Task key={task.id} {...task}/>
                    ))
                )}
            </div>
            {tasks.length > 0 && (
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(tasks.length / tasksPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName="flex items-center gap-2 mt-4"
                    pageClassName="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 cursor-pointer transition duration-300"
                    previousClassName="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 cursor-pointer transition duration-300"
                    nextClassName="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 cursor-pointer transition duration-300"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    activeClassName="bg-blue-700"
                />
            )}
        </div>
    )
}

export default Tasks