import * as tasksActions from './tasks-actions'
import * as todolistsAsyncActions from './todolist-actions'
import {slice} from "./todolists-reducer";


const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}

export {
    tasksActions,
    todolistsActions,

}

