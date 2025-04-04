import { createSlice } from "@reduxjs/toolkit"

const visibilitySlice = createSlice({
    name: "tasksVisibility",
    initialState: { showAddTask: false },
    reducers: {
        hideAddTaskForm: (state) => {
            state.showAddTask = false
        },
        showAddTaskForm: (state) => {
            state.showAddTask = true
        }
    }
})

export const { hideAddTaskForm, showAddTaskForm } = visibilitySlice.actions
export default visibilitySlice.reducer