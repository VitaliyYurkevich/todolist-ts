import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer";
import {log} from "util";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


export type TodolistPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void

}


const TodoList = React.memo( (props: TodolistPropsType) => {
console.log('TodoList')
    const tasks = useSelector<AppRootStateType,Array<TasksType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()


const addTask = useCallback((title:string) => {
    dispatch(addTaskAC(title, props.id))
}, [])

    const onAllClickHandler = useCallback (() => {
        props.changeFilter("all", props.id)
    }, [])
    const onActiveClickHandler = useCallback (() => {
        props.changeFilter("active", props.id)
    }, [])
    const onCompletedClickHandler = useCallback (() => {
        props.changeFilter("completed", props.id)
    }, [])
    const removeTodolist = useCallback (() => {
        props.removeTodolist(props.id)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    },[])

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }


    return (
        <div>
            <div>
                <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                    <IconButton aria-lablel={"delete"} onClick={removeTodolist}> <DeleteIcon /> </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {tasksForTodolist.map((t) => {

                        const onRemoveHandler = () => {
                            dispatch(removeTasksAC(t.id, props.id))
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))

                        }
                        const onChangeStatusHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                        }

                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ''}>
                                <Checkbox onChange={onChangeHandler} checked={t.isDone}

                                />
                                <EditableSpan title={t.title} onChange={onChangeStatusHandler}  />
                                <IconButton aria-lablel={"delete"} onClick={onRemoveHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                        )

                    })}
                </div>
                <div>
                    <Button variant={props.filter === 'all' ? "contained" : 'text'} onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={"primary"} variant={props.filter === 'active' ? "contained" : 'text'}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : 'text'}
                            onClick={onCompletedClickHandler}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
});


export default TodoList;