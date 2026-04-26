import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { test } from '@playwright/test'

import { TodoPage } from '../page-objects/todo-page'
import { loadFeatureFile } from '../support/feature-file'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const feature = loadFeatureFile(path.resolve(currentDirectory, '../features/todo-management.feature'))

const scenarioImplementations: Record<string, (context: { todoPage: TodoPage }) => Promise<void>> = {
  'Add, complete, edit, filter, and delete a task': async ({ todoPage }) => {
    await todoPage.goto()
    await todoPage.addTask('Plan sprint review')
    await todoPage.markTaskAsComplete('Plan sprint review')
    await todoPage.editTask('Plan sprint review', 'Plan sprint review with notes')
    await todoPage.filterBy('Completed')
    await todoPage.expectTaskVisible('Plan sprint review with notes')
    await todoPage.deleteTask('Plan sprint review with notes')
    await todoPage.expectEmptyState('Completed')
  },
}

test.describe(feature.name, () => {
  for (const scenario of feature.scenarios) {
    const runScenario = scenarioImplementations[scenario.name]

    if (!runScenario) {
      throw new Error(`Missing Playwright implementation for scenario: "${scenario.name}"`)
    }

    test(scenario.name, async ({ page }) => {
      const todoPage = new TodoPage(page)

      test.info().annotations.push({
        type: 'feature-file',
        description: scenario.steps.join('\n'),
      })

      await runScenario({ todoPage })
    })
  }
})
