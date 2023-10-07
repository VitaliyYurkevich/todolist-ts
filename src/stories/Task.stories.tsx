import {AddItemForm} from "../AddItemForm";
import { action } from '@storybook/addon-actions'
import {Task} from "../Task";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../state/store";


export default {
    title: "Task component",
    component: Task
}

//const callback = action("Button 'add' was pressed inside the form ")



export const TaskBaseExample = () => {
    return <>
       <Provider store={store}> <Task id={"todolistId1"} filter={"all"}  /></Provider>
    </>
}