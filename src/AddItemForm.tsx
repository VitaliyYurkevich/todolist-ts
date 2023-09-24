import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";

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
        setError(null)
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

    return (
        <div>
            <TextField
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ""}
            />
            <Button onClick={addTask} variant={"contained"} color={'primary'}>+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )

}