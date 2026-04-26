Feature: Todo management
  As a user
  I want to manage my task list
  So that I can track work on any device

  Scenario: Add, complete, edit, filter, and delete a task
    Given I open the todo application
    When I add a task named "Plan sprint review"
    And I mark the task "Plan sprint review" as complete
    And I edit the task "Plan sprint review" to "Plan sprint review with notes"
    And I filter tasks by "Completed"
    Then I should see the task "Plan sprint review with notes"
    When I delete the task "Plan sprint review with notes"
    Then I should see an empty state for the "Completed" filter
