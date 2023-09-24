import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}


export type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void

}


const TodoList = (props: TodolistPropsType) => {


    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {

        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    return (
        <div>
            <div>
                <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                    <IconButton aria-lablel={"delete"} onClick={removeTodolist}> <DeleteIcon /> </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {props.tasks.map((t) => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeStatusHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return (
                            <li className={t.isDone ? "is-done" : ''}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeHandler}
                                />
                                <EditableSpan title={t.title} onChange={onChangeStatusHandler}  />
                                <IconButton aria-lablel={"delete"} onClick={onRemoveHandler}><DeleteIcon />
                                </IconButton>
                            </li>

                        )

                    })}
                </ul>
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
};


export default TodoList;