import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TasksType, TodolistPropsType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const changeTodolistTitle = (todolistId: string, newTitle: string,) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)

    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)

    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)

        dispatch(action)
    }

    const addTodolist = (title: string) => {

        const action = addTodolistAC(title)

        dispatch(action)
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Menu
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {





                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        removeTodolist={removeTodolist}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        changeTodolistTitle={changeTodolistTitle}

                                    />
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
