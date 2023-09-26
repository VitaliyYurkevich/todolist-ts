type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            let newState = {...state}
            newState.age = state.age + 1
            return newState
        case 'INCREMENT-CHILDREN-COUNT':
return {
    ...state,
    childrenCount: state.childrenCount + 1
}
           /* state.childrenCount = state.childrenCount + 1
            return state*/
        default:
            throw new Error('I don\'t understand this type')
    }
}
