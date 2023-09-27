import {FilterValuesType} from "../App";


export const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type ActionType = {
    type: string
    [key: string]: any
}

export const TodolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        default:
            throw new Error("I don`t understand this action type")
    }
}


