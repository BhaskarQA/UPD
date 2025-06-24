Feature: Create workflow 

 Scenario: I log in with valid credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I enter a valid email and password
    And I click the Sign in button
   #  Then I should be redirected to the dashboard page
    When I click on the createWorkflow 
    And I enter the Title and Description for the workflow
    And I click on sumbit workflow button
    Then I verify the workflow is created successfull
    
    
    