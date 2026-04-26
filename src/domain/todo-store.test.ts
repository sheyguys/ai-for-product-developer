import { describe, expect, it } from 'vitest'

import {
  createTodo,
  getVisibleTodos,
  todoReducer,
  type TodoFilter,
  type TodoState,
} from './todo-store'

describe('todoStore', () => {
  it('adds a trimmed todo item', () => {
    const initialState: TodoState = {
      filter: 'all',
      todos: [],
    }

    const nextState = todoReducer(initialState, {
      type: 'todo/added',
      payload: createTodo('  Write tests first  ', 'todo-1'),
    })

    expect(nextState.todos).toEqual([
      {
        id: 'todo-1',
        title: 'Write tests first',
        completed: false,
      },
    ])
  })

  it('updates the title of an existing todo', () => {
    const initialState: TodoState = {
      filter: 'all',
      todos: [createTodo('Write tests first', 'todo-1')],
    }

    const nextState = todoReducer(initialState, {
      type: 'todo/edited',
      payload: {
        id: 'todo-1',
        title: 'Write fewer but stronger tests',
      },
    })

    expect(nextState.todos[0]?.title).toBe('Write fewer but stronger tests')
  })

  it('marks a todo as completed', () => {
    const initialState: TodoState = {
      filter: 'all',
      todos: [createTodo('Ship responsive layout', 'todo-1')],
    }

    const nextState = todoReducer(initialState, {
      type: 'todo/toggled',
      payload: {
        id: 'todo-1',
      },
    })

    expect(nextState.todos[0]?.completed).toBe(true)
  })

  it('removes a todo item', () => {
    const initialState: TodoState = {
      filter: 'all',
      todos: [
        createTodo('Keep this', 'todo-1'),
        createTodo('Delete this', 'todo-2'),
      ],
    }

    const nextState = todoReducer(initialState, {
      type: 'todo/deleted',
      payload: {
        id: 'todo-2',
      },
    })

    expect(nextState.todos.map((todo) => todo.id)).toEqual(['todo-1'])
  })

  it.each<[TodoFilter, string[]]>([
    ['all', ['todo-1', 'todo-2']],
    ['active', ['todo-1']],
    ['completed', ['todo-2']],
  ])('filters visible todos for %s', (filter, expectedIds) => {
    const initialState: TodoState = {
      filter,
      todos: [
        createTodo('Plan work', 'todo-1'),
        {
          ...createTodo('Done work', 'todo-2'),
          completed: true,
        },
      ],
    }

    expect(getVisibleTodos(initialState).map((todo) => todo.id)).toEqual(expectedIds)
  })
})
