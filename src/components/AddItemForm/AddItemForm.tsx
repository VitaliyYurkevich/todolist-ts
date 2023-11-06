import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import {useAddItemForm} from "../../hooks/useAddItemForm";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}



export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType ) => {

const {title, onNewTitleChangeHandler, onKeyPressHandler, error, addTask } = useAddItemForm(addItem)

    return (

        <div>
            <TextField
                disabled={disabled}
                value={title}
                variant={"outlined"}
                label={"Type value"}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask}  color={'primary'} disabled={disabled}><ControlPoint/> </IconButton>
        </div>
    )

})