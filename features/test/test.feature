Feature: Workflow Feature Behaviour 

 Scenario: I log in with valid credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I enter a valid email and password
    And I click the Sign in button
    
Scenario: Delete workflow
    Given I visit the editing workflow 
    When I delete the workflow 
    Then I check the workflow is deleted 