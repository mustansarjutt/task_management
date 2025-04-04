import { configureStore } from "@reduxjs/toolkit"
import { taskReducer } from "../features/tasks/tasksSlice"
import visibilityReducer from "../features/addTaskVisibility/taskVisibilitySlice"

const store = configureStore({
    reducer: {
        tasks: taskReducer,
        addTaskVisibility: visibilityReducer
    }
})

export default store