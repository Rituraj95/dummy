import React, { createContext, useContext, useReducer } from 'react'

const userProvider = createContext();
const initialValue = {
    users: []
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case 'REMOVE':
            const index = state.users.findIndex(e => {
                return action.payload._id === e._id
            })
            const newState = state.users
            newState.splice(index, 1)
            return {
                ...state,
                users: [...newState]
            }

        default:
            return state
    }
}

function DataProvider({ children }) {
    return (
        <userProvider.Provider value={useReducer(reducer, initialValue)}>
            {
                children
            }
        </userProvider.Provider>

    )
}


export const useValue = () => useContext(userProvider)
export default DataProvider