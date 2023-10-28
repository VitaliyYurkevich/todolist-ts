import {AddItemForm} from "./AddItemForm";
import { action } from '@storybook/addon-actions'

export default {
    title: "AddItemForm component",
    component: AddItemForm
}

const callback = action("Button ")


export const AddItemFormExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}