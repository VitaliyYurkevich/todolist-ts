import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '482cc18a-19a0-4ab1-be65-64dee4acdd40',
    },
})


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>,
    data: D
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Late
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export const todolistsApi = {

    getTodolists() {

        return instance.get <Array<TodolistType>>("todo-lists")
    },
    deleteTodolists(todolistId: string) {


        return instance.delete <ResponseType>(`todo-lists/${todolistId}`)

    },
    createTodolists(title: string) {

        return instance.post <ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})

    },
    updateTodolists(todolistId: string, title: string) {

        return instance.put(`todo-lists/${todolistId}`, {title: title})

    },
    getTasks(todolistId: string) {

        return instance.get <GetTasksResponse>(`todo-lists/${todolistId}/tasks`)

    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)


    },
    createTasks(todolistId: string, title: string) {
        return instance.post <ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})


    },

    updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType) {

        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {model})


    },


}