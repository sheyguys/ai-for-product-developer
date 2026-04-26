import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('adds and shows a new todo item', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/task title/i), 'Buy oat milk')
    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByText('Buy oat milk')).toBeInTheDocument()
  })

  it('edits an existing todo item', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/task title/i), 'Refactor reducer')
    await user.click(screen.getByRole('button', { name: /add task/i }))
    await user.click(screen.getByRole('button', { name: /edit refactor reducer/i }))

    const editor = screen.getByLabelText(/edit task title/i)

    await user.clear(editor)
    await user.type(editor, 'Refactor reducer with tests')
    await user.click(screen.getByRole('button', { name: /save task/i }))

    expect(screen.getByText('Refactor reducer with tests')).toBeInTheDocument()
  })

  it('marks a task as completed and filters it', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/task title/i), 'Ship mobile layout')
    await user.click(screen.getByRole('button', { name: /add task/i }))
    await user.click(screen.getByRole('checkbox', { name: /mark ship mobile layout as complete/i }))
    await user.click(screen.getByRole('button', { name: /completed/i }))

    const completedList = screen.getByRole('list', { name: /todo items/i })

    expect(within(completedList).getByText('Ship mobile layout')).toBeInTheDocument()
    expect(screen.queryByText(/no tasks match/i)).not.toBeInTheDocument()
  })

  it('deletes a task from the list', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText(/task title/i), 'Delete me')
    await user.click(screen.getByRole('button', { name: /add task/i }))
    await user.click(screen.getByRole('button', { name: /delete delete me/i }))

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
  })
})
