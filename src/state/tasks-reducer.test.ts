import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from './tasks-reducer'
import { TaskStateType } from "../App"
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

test('correct task should be deleted from correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', addedDate: '', order: 0, status: TaskStatuses.InProgress, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  },
            {id: '2', title: 'JS', addedDate: '', order: 0, status: TaskStatuses.InProgress, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  },
            {id: '3', title: 'React', addedDate: '', order: 0, status: TaskStatuses.InProgress, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  }
        ],
        'todolistId2': [
            {id: '1', title: 'bread', addedDate: '', order: 0, status: TaskStatuses.InProgress, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  },
            {id: '2', title: 'milk', addedDate: '', order: 0, status: TaskStatuses.InProgress, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  },
            {id: '3', title: 'tea', addedDate: '', order: 0, status: TaskStatuses.InProgress, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  }
        ]
    }

    const action = removeTasksAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)


    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  },
            {id: '2', title: 'JS', addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  },
            {id: '3', title: 'React', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"  }
        ],
        'todolistId2': [
            {id: '1', title: 'bread', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId2"  },
            {id: '2', title: 'milk', addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId2"  },
            {id: '3', title: 'tea', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId2"  }
        ]
    }

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})


test('status of specified task should be changed', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '2', title: 'JS', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '3', title: 'React', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId2"},
            {id: '2', title: 'milk', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId2"},
            {id: '3', title: 'tea', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId2"}
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('correct todolist should change its name', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '2', title: 'JS',addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '3', title: 'React', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '2', title: 'milk', addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '3', title: 'tea', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"}
        ]
    }

    const action = changeTaskTitleAC('2', 'dog', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('dog')

})

test('new array should be added when new todolist is added', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '2', title: 'JS', addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '3', title: 'React', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '2', title: 'milk', addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '3', title: 'tea', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})


test('property with todolistId should be deleted', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '2', title: 'JS', addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '3', title: 'React', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '2', title: 'milk', addedDate: '', order: 0, status: TaskStatuses.Completed, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"},
            {id: '3', title: 'tea', addedDate: '', order: 0, status: TaskStatuses.New, deadline: '', startDate: '', description: '', priority: TaskPriorities.Low, todoListId:  "todolistId1"}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
