import {AddItemForm} from "../AddItemForm/AddItemForm";
import { action } from '@storybook/addon-actions'
import {Task} from "../../features/Todolists/Todolist/Task/Task";
import React from "react";
import {EditableSpan} from "./EditableSpan";


export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const changeCallback = action("Value changed ")



export const EditableSpanBaseExample = () => {
    return <EditableSpan onChange={changeCallback} title={'Title'}  />

}