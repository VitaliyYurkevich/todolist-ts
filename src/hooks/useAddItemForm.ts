import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";




export const useAddItemForm = (addItem: (title: string) => void) => {



    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !==null){
            setError(null)
        }

        if (e.key === "Enter") {
            addItem(title)
            setTitle("")
        }
    }



    const addTask = () => {

        if (title.trim() !== "") {
            addItem(title.trim())
            setTitle("")
        } else {
            setError('Title is required')
        }
    }

return {
    error,
    title,
    onNewTitleChangeHandler,
    onKeyPressHandler,
    addTask


}

}