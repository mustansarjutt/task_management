import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../features/tasks/tasksSlice"
import AlertBox from "../utils/AlertBox"
import { hideAddTaskForm } from "../features/addTaskVisibility/taskVisibilitySlice"

const AddTask = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [alert, setAlert] = useState(null)

    const dispatch = useDispatch()

    const handleDateChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "")

        if (value.length > 4) {
            value = value.slice(0, 4) + "-" + value.slice(4)
        }
        if (value.length > 7) {
            value = value.slice(0, 7) + "-" + value.slice(7)
        }
        if (value.length > 10) {
            value = value.slice(10)
        }

        setDate(value)
    }
    const clearTable = () => {
        setTitle("")
        setDate("")
        setDesc("")
    }

    const handleAddTask = () => {
        if ([title, desc, date].some(field => field === "")) {
            setAlert({ message: "All fields are required", type: "error" })
            return
        }

        dispatch(addTask({
            title,
            desc,
            dueDate: date
        }))
        setAlert({ message: "Task added", type: "success" })
        clearTable()
        setTimeout(() => {
            handleCancel()
        }, 5000)
    }
    const handleCancel = () => {
        dispatch(hideAddTaskForm())
    }

    return (
        <div className="flex justify-center rounded-2xl items-center p-2.5 shadow-2xl bg-slate-300 border-2 border-slate-500 md:w-[60%] sm:w-[75%] w-[90%] mx-auto">
            <div className="flex flex-col gap-y-3 w-[90%]">
                <div className="flex flex-col gap-y-2">
                    <label
                        htmlFor="title"
                        className="text-2xl font-bold text-gray-800"
                    >
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="rounded-xl outline-none px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-500 w-full text-gray-600 font-bold font-serif placeholder:text-gray-400"
                        placeholder="title of your task..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label
                        htmlFor="desc"
                        className="text-2xl font-bold text-gray-800"
                    >
                        Description:
                    </label>
                    <textarea
                        id="desc"
                        rows="3"
                        className="rounded-xl outline-none px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-500 w-full text-gray-600 font-semibold font-sans placeholder:text-gray-400"
                        placeholder="describe your task..."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label
                        htmlFor="dueDate"
                        className="text-2xl font-bold text-gray-800"
                    >
                        Due Date:
                    </label>
                    <input
                        type="text"
                        id="dueDate"
                        className="rounded-xl outline-none px-3 py-1.5 bg-white focus:ring-2 focus:ring-blue-500 w-full text-gray-600 font-bold font-mono placeholder:text-gray-400"
                        placeholder="YYYY-MM-DD"
                        maxLength={10}
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="flex justify-center items-center gap-x-3">
                    <button
                        className="bg-sky-600 text-white font-bold py-1.5 px-3 rounded-2xl cursor-pointer hover:bg-sky-700 transition-all duration-300 ease-in"
                        onClick={handleAddTask}
                    >
                        Add
                    </button>
                    <button
                        className="bg-red-600 text-white font-bold py-1.5 px-3 rounded-2xl cursor-pointer hover:bg-red-700 transition-all duration-300 ease-in"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
                {alert && <AlertBox message={alert?.message} type={alert?.type} onClose={() => setAlert(null)} />}
            </div>
        </div>
    )
}

export default AddTask