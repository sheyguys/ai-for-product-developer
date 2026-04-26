export type Todo = {
  id: string
  title: string
  completed: boolean
}

export type TodoFilter = 'all' | 'active' | 'completed'

export type TodoState = {
  filter: TodoFilter
  todos: Todo[]
}

type TodoAction =
  | {
      type: 'todo/added'
      payload: Todo
    }
  | {
      type: 'todo/edited'
      payload: {
        id: string
        title: string
      }
    }
  | {
      type: 'todo/toggled'
      payload: {
        id: string
      }
    }
  | {
      type: 'todo/deleted'
      payload: {
        id: string
      }
    }
  | {
      type: 'filter/changed'
      payload: {
        filter: TodoFilter
      }
    }

export const initialTodoState: TodoState = {
  filter: 'all',
  todos: [],
}

export function createTodo(title: string, id: string): Todo {
  return {
    id,
    title: title.trim(),
    completed: false,
  }
}

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'todo/added':
      if (!action.payload.title) {
        return state
      }

      return {
        ...state,
        todos: [...state.todos, action.payload],
      }

    case 'todo/edited':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                title: action.payload.title.trim() || todo.title,
              }
            : todo,
        ),
      }

    case 'todo/toggled':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        ),
      }

    case 'todo/deleted':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }

    case 'filter/changed':
      return {
        ...state,
        filter: action.payload.filter,
      }
  }
}

export function getVisibleTodos(state: TodoState): Todo[] {
  switch (state.filter) {
    case 'active':
      return state.todos.filter((todo) => !todo.completed)
    case 'completed':
      return state.todos.filter((todo) => todo.completed)
    case 'all':
      return state.todos
  }
}
