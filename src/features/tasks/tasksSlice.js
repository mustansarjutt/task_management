import { createSlice, nanoid } from "@reduxjs/toolkit"

const loadTasks = () => {
    const loadedTasks = localStorage.getItem("tasks")

    return loadedTasks ? JSON.parse(loadedTasks) : []
}

const initialState = {
    tasks: loadTasks(),
    filteredTasks: []
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const date = new Date()
            const task = {
                id: nanoid(),
                title: action.payload.title,
                desc: action.payload.desc,
                status: "pending",
                dueDate: action.payload.dueDate,
                createdAt: date.toISOString().split("T")[0],
                updatedAt: date.toISOString().split("T")[0]
            }

            state.tasks.push(task)
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        updateTask: (state, action) => {
            const { id, title, desc, status, dueDate } = action.payload

            const index = state.tasks.findIndex((task) => task.id === id)

            if (index !== -1) {
                const date = new Date()
                state.tasks[index] = {
                    ...state.tasks[index],
                    title,
                    desc,
                    status,
                    dueDate,
                    updatedAt: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                }
                localStorage.setItem("tasks", JSON.stringify(state.tasks))
            }
        },
        toggleTaskStatus: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload)

            if (index !== -1) {
                state.tasks[index].status = state.tasks[index].status === "pending" ? "completed" : "pending"
                localStorage.setItem("tasks", JSON.stringify(state.tasks))
            }
        },
        clearCompletedTasks: (state) => {
            state.tasks = state.tasks.filter((task) => task.status !== "completed")
            localStorage.setItem("tasks", JSON.stringify(state.tasks))
        },
        filterTasks: (state, action) => {
            state.filteredTasks = state.tasks.filter((task) => task.status === action.payload)
        },
        searchTasks: (state, action) => {
            const query = action.payload.toLowerCase()
            
            state.filteredTasks = state.tasks.filter((task) => (task.title.toLowerCase().includes(query) || task.desc.toLowerCase().includes(query)))
        },
        clearAllTasks: (state) => {
            state.tasks = []
            localStorage.removeItem("tasks")
        }
    }
})

const taskReducer = taskSlice.reducer
const { addTask, deleteTask, updateTask,clearCompletedTasks, toggleTaskStatus, searchTasks, filterTasks, clearAllTasks } = taskSlice.actions

export {
    taskReducer,
    addTask,
    deleteTask,
    updateTask,
    clearCompletedTasks,
    toggleTaskStatus,
    searchTasks,
    filterTasks,
    clearAllTasks
}