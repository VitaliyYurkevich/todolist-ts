import {AddItemForm} from "../AddItemForm";


export default {
    title: "AddItemForm component",
    component: AddItemForm
}


export const AddItemFormExample = (props: any) => {
    return <AddItemForm addItem={(title)=>{alert(title)}}/>
}