import { userReducer } from './user-reducer'

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    const endState = userReducer(startState,{type: 'INCREMENT-CHILDREN-COUNT'})
    // your code here
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)

})


test('user reducer should increment name of user', () => {
    let newName = 'Victor'
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    const endState = userReducer(startState,{type: 'RENAME-NAME', newName: newName})
    // your code here
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(2)
    expect(endState.name).toBe(newName)

})
