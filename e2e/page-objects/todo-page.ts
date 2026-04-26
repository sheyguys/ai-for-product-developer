import { expect, type Locator, type Page } from '@playwright/test'

export class TodoPage {
  readonly page: Page
  readonly taskTitleInput: Locator
  readonly addTaskButton: Locator
  readonly todoList: Locator
  readonly emptyState: Locator

  constructor(page: Page) {
    this.page = page
    this.taskTitleInput = page.getByLabel('Task title')
    this.addTaskButton = page.getByRole('button', { name: 'Add task' })
    this.todoList = page.getByRole('list', { name: 'Todo items' })
    this.emptyState = page.getByRole('status')
  }

  async goto() {
    await this.page.goto('/')
    await expect(this.page.getByRole('heading', { name: 'Todo Flow' })).toBeVisible()
  }

  async addTask(title: string) {
    await this.taskTitleInput.fill(title)
    await this.addTaskButton.click()
  }

  async markTaskAsComplete(title: string) {
    await this.page.getByRole('checkbox', { name: `Mark ${title} as complete` }).check()
  }

  async editTask(previousTitle: string, nextTitle: string) {
    await this.page.getByRole('button', { name: `Edit ${previousTitle}` }).click()
    const input = this.page.getByLabel('Edit task title')
    await input.fill(nextTitle)
    await this.page.getByRole('button', { name: 'Save task' }).click()
  }

  async filterBy(filterName: 'All' | 'Active' | 'Completed') {
    await this.page.getByRole('button', { name: filterName }).click()
  }

  async deleteTask(title: string) {
    await this.page.getByRole('button', { name: `Delete ${title}` }).click()
  }

  async expectTaskVisible(title: string) {
    await expect(this.todoList.getByText(title)).toBeVisible()
  }

  async expectEmptyState(filterName: string) {
    await expect(this.emptyState).toContainText('No tasks match the selected filter.')
    await expect(this.page.getByRole('button', { name: filterName })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  }
}
