import { useState, useRef, useEffect } from "react"
import { FaEllipsisV } from "react-icons/fa"
import { deleteTask, markAsCompleted } from "../features/tasks/tasksSlice"
import { useDispatch } from "react-redux"

const Task = ({ id, title, desc, status, dueDate, createdAt, updatedAt }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleMenu = (e) => {
        if (e.target.textContent === "Delete") {
            dispatch(deleteTask(id))
            setMenuOpen(false)
        }
        if (e.target.textContent === "Mark as complete") {
            if (status === "pending") {
                dispatch(markAsCompleted(id))
            }
            setMenuOpen(false)
        }
    }

    return (
        <div className="w-full my-4 flex justify-center items-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg flex flex-col gap-y-3 md:w-[60%] sm:w-[80%] w-[90%] p-4 relative">
                <div className="flex flex-row justify-between items-center">
                    <span className="text-3xl font-bold">{title}</span>
                    <div className="relative" ref={menuRef}>
                        <FaEllipsisV
                            size={22}
                            className="cursor-pointer opacity-70 hover:opacity-100"
                            onClick={() => setMenuOpen(prev => !prev)}
                        />
                        {menuOpen && (
                            <ul className="absolute right-0 top-6 w-40 bg-white text-gray-800 shadow-md rounded-lg overflow-hidden z-10">
                                {["Edit", "Mark as complete", "Delete"].map((opt, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors"
                                        onClick={(e) => {
                                            handleMenu(e)
                                        }}
                                    >
                                        {opt}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 shadow-md">
                    <p className="text-white/90">{desc}</p>
                </div>
                <div className="flex flex-col gap-y-2">
                    <p className="font-bold">
                        Status: 
                        <span className={`ml-2 text-white text-sm font-semibold px-3 py-1 rounded-lg capitalize 
                            ${status === "pending" ? "bg-yellow-500" : "bg-green-600"}`}>
                            {status}
                        </span>
                    </p>
                    <span className="font-bold">📅 Due Date: {dueDate}</span>
                </div>
                <hr className="border-white/40 my-2" />
                <div className="flex justify-between text-sm opacity-80">
                    <span>📌 Created: {createdAt}</span>
                    <span>🔄 Updated: {updatedAt}</span>
                </div>
            </div>
        </div>
    )
}

export default Task