import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import {log} from "util";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export function AddItemForm(props: AddItemFormPropsType) {

    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !==null){
            setError(null)
        }

        if (e.key === "Enter") {
            props.addItem(title)
            setTitle("")
        }
    }



    const addTask = () => {

        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError('Title is required')
        }
    }
    console.log('render AddItemForm')
    return (

        <div>
            <TextField
                value={title}
                variant={"outlined"}
                label={"Type value"}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask}  color={'primary'}><ControlPoint/> </IconButton>
        </div>
    )

}