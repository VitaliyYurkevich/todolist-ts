import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {setIsInitializedTC} from "./app-reducer";
import {Login} from "../features/Auth/Login";
import {Route, Routes} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../features/Auth/auth-reducer";
import {authSelectors} from "../features/Auth";
import {appSelectors} from "./index";


type TodolistType = {
    id: string
    title: string

}

type PropsType = {
    demo?: boolean
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


const App = React.memo(({demo = false}: PropsType) => {
    const status = useSelector(appSelectors.selectStatus)
    const isInitialized = useSelector(appSelectors.selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsloggedIn)
    const dispatch = useDispatch()

    useEffect(() => {

        // @ts-ignore
        dispatch(setIsInitializedTC())
    }, [])

    const logOutHandler = useCallback(()=>{

        // @ts-ignore
        dispatch(logoutTC());
    },[])


    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', width: '100%', textAlign: 'center'}}>
            <CircularProgress/>
        </div>
    }



    return (

            <div className="App">
                <ErrorSnackbar/>
                <AppBar position={"static"}>
                    <Toolbar>
                        <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            Menu
                        </Typography>
                        {isLoggedIn  && <Button onClick={logOutHandler} color="inherit">Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistsList/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>


                </Container>
            </div>

    );
})


export default App;
