import type { TodoFilter } from '../domain/todo-store'

const allowedFilters: TodoFilter[] = ['all', 'active', 'completed']

function normalizeFilter(value: string | undefined): TodoFilter {
  if (value && allowedFilters.includes(value as TodoFilter)) {
    return value as TodoFilter
  }

  return 'all'
}

export const appConfig = {
  appTitle: import.meta.env.VITE_APP_TITLE?.trim() || 'Todo Flow',
  defaultFilter: normalizeFilter(import.meta.env.VITE_DEFAULT_FILTER),
}
