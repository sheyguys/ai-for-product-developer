import { FormEvent, useReducer, useState } from 'react'

import { appConfig } from './config/app-config'
import {
  createTodo,
  getVisibleTodos,
  initialTodoState,
  todoReducer,
  type Todo,
  type TodoFilter,
} from './domain/todo-store'
import './styles.css'

const filterLabels: Record<TodoFilter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `todo-${Date.now()}`
}

function getEmptyStateMessage(filter: TodoFilter) {
  if (filter === 'all') {
    return 'No tasks yet. Add your first task to start the flow.'
  }

  return 'No tasks match the selected filter.'
}

function TodoListItem({
  isEditing,
  todo,
  editingTitle,
  onEditingTitleChange,
  onEditStart,
  onEditSave,
  onEditCancel,
  onToggle,
  onDelete,
}: {
  isEditing: boolean
  todo: Todo
  editingTitle: string
  onEditingTitleChange: (title: string) => void
  onEditStart: () => void
  onEditSave: () => void
  onEditCancel: () => void
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <li className="todo-item">
      <label className="todo-check">
        <input
          checked={todo.completed}
          aria-label={`Mark ${todo.title} as complete`}
          onChange={onToggle}
          type="checkbox"
        />
      </label>

      {isEditing ? (
        <div className="todo-editing">
          <label className="sr-only" htmlFor={`edit-${todo.id}`}>
            Edit task title
          </label>
          <input
            className="todo-edit-input"
            id={`edit-${todo.id}`}
            value={editingTitle}
            onChange={(event) => onEditingTitleChange(event.target.value)}
          />
          <button className="secondary-button" onClick={onEditSave} type="button">
            Save task
          </button>
          <button className="ghost-button" onClick={onEditCancel} type="button">
            Cancel edit
          </button>
        </div>
      ) : (
        <>
          <div className="todo-copy">
            <span className={todo.completed ? 'todo-title is-complete' : 'todo-title'}>
              {todo.title}
            </span>
            <span className="todo-status">{todo.completed ? 'Completed' : 'In progress'}</span>
          </div>
          <div className="todo-actions">
            <button
              aria-label={`Edit ${todo.title}`}
              className="ghost-button"
              onClick={onEditStart}
              type="button"
            >
              Edit
            </button>
            <button
              aria-label={`Delete ${todo.title}`}
              className="danger-button"
              onClick={onDelete}
              type="button"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, {
    ...initialTodoState,
    filter: appConfig.defaultFilter,
  })
  const [draftTitle, setDraftTitle] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const visibleTodos = getVisibleTodos(state)
  const completedCount = state.todos.filter((todo) => todo.completed).length

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const todo = createTodo(draftTitle, createId())

    if (!todo.title) {
      return
    }

    dispatch({
      type: 'todo/added',
      payload: todo,
    })
    setDraftTitle('')
  }

  function startEditing(todo: Todo) {
    setEditingId(todo.id)
    setEditingTitle(todo.title)
  }

  function saveEditing(todo: Todo) {
    dispatch({
      type: 'todo/edited',
      payload: {
        id: todo.id,
        title: editingTitle,
      },
    })
    setEditingId(null)
    setEditingTitle('')
  }

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header className="hero">
          <p className="eyebrow">Responsive TypeScript task board</p>
          <h1>{appConfig.appTitle}</h1>
          <p className="hero-copy">
            Stateless todo list for mobile, tablet, and desktop. All changes stay in memory only.
          </p>
        </header>

        <section className="panel">
          <form className="composer" onSubmit={handleAddTask}>
            <label className="field-label" htmlFor="task-title">
              Task title
            </label>
            <div className="composer-row">
              <input
                className="task-input"
                id="task-title"
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="What needs to be done?"
                value={draftTitle}
              />
              <button className="primary-button" type="submit">
                Add task
              </button>
            </div>
          </form>

          <div className="toolbar">
            <div className="summary" aria-live="polite">
              <strong>{state.todos.length}</strong> tasks
              <span>{completedCount} completed</span>
            </div>
            <div className="filters" aria-label="Todo filters" role="group">
              {(Object.keys(filterLabels) as TodoFilter[]).map((filter) => (
                <button
                  aria-pressed={state.filter === filter}
                  className={state.filter === filter ? 'filter-button is-active' : 'filter-button'}
                  key={filter}
                  onClick={() =>
                    dispatch({
                      type: 'filter/changed',
                      payload: { filter },
                    })
                  }
                  type="button"
                >
                  {filterLabels[filter]}
                </button>
              ))}
            </div>
          </div>

          {visibleTodos.length > 0 ? (
            <ul aria-label="Todo items" className="todo-list">
              {visibleTodos.map((todo) => (
                <TodoListItem
                  editingTitle={editingId === todo.id ? editingTitle : todo.title}
                  isEditing={editingId === todo.id}
                  key={todo.id}
                  onDelete={() =>
                    dispatch({
                      type: 'todo/deleted',
                      payload: { id: todo.id },
                    })
                  }
                  onEditCancel={() => {
                    setEditingId(null)
                    setEditingTitle('')
                  }}
                  onEditingTitleChange={setEditingTitle}
                  onEditSave={() => saveEditing(todo)}
                  onEditStart={() => startEditing(todo)}
                  onToggle={() =>
                    dispatch({
                      type: 'todo/toggled',
                      payload: { id: todo.id },
                    })
                  }
                  todo={todo}
                />
              ))}
            </ul>
          ) : (
            <div className="empty-state" role="status">
              {getEmptyStateMessage(state.filter)}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}
