import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": '482cc18a-19a0-4ab1-be65-64dee4acdd40'
    }
}


export const todolistsApi = {

    getTodolists() {

        const promise = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise
    },

    createTodolists() {

        const promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: "sadasda"}, settings)
        return promise
    },
    deleteTodolists() {

        let todolistId = '4230afd9-7b70-430a-854b-b5726c9e4c79'
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise
    },
    updateTodolists() {

        let todolistId = '4c667768-681d-4d10-9592-fad11463b2a2'
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: "asdas2131231231231"}, settings)
        return promise
    }


}