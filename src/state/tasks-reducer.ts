import {TasksType} from "../TodoList";
import {v1} from "uuid";

type TaskStateType = {
    [key: string]: Array<TasksType>
}

export type RemoveTasksActionType = {
    type: 'REMOVE_TASKS'
    todolistId: string
    id: string

}

export type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleType = {
    type: "CHANGE_TASK_TITLE"
    title: string
    todolistId: string
    taskId: string
}

type ActionsType = RemoveTasksActionType | AddTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType


export const tasksReducer = (state: TaskStateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE_TASKS": {
            let stateCopy = {...state}
            let tasks = state[action.todolistId]
            let filteredTasks = tasks.filter(t => t.id !== action.id)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD_TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            let tasks = state[action.todolistId]
            let newTasks = [newTask, ...tasks]
            state[action.todolistId] = newTasks
            return {...state}
        }
        case "CHANGE_TASK_STATUS": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]

            let task = tasks.find(t => t.id === action.taskId)
            if(task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE_TASK_TITLE": {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }

        default:
            throw new Error("I don`t understand this action type")
    }


}

export const removeTasksAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE_TASKS', id: taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title: title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE_TASK_STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE_TASK_TITLE', taskId: taskId, title: title, todolistId: todolistId}
}
