import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {TodolistsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({

    tasks: tasksReducer,
    todolists: TodolistsReducer

    }
)


export const store = createStore(rootReducer)


export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store