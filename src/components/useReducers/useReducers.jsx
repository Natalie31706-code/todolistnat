import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { userList } from '../Data/data'

const userSlice = createSlice({
    name: "users",
    initialState: userList,
    reducers: {
        addUser: (state,action) =>{
            state.push(action.payload)
        },

        updateUser: (state,action) =>{
            const {task, notes, id} = action.payload
            const user = state.find((u) => u.id == id)
            if (user) {
                user.task = task
                user.notes = notes
            }
        },

        deleteUser: (state,action) =>{
            const {id} = action.payload
            return state.filter((u) => u.id !== id)
        },

        toggleComplete: (state, action) => {         // ⬅️ new reducer
            const { id } = action.payload
            const user = state.find((u) => u.id == id)
            if (user) {
                user.completed = !user.completed     // ⬅️ toggle completion
            }
        }
    }
})

export const {addUser , updateUser , deleteUser, toggleComplete /*⬅️ added toggle handler*/ } = userSlice.actions
export default userSlice.reducer