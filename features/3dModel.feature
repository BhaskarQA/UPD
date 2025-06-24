Feature: 3DModel workflow functionality check

 Scenario: I log in with valid credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I enter a valid email and password
    And I click the Sign in button
   #  Then I should be redirected to the dashboard page
    When I click on the createWorkflow 
    And I enter the Title and Description for the workflow
    And I click on sumbit workflow button
    Then I verify the workflow is created successfull
   When I fill the details for type section and instruction section
  | Type                    | Instruction                                                                                         |
  | Setting up the machine | Setting Up Machine means the carrying out of final machine adjustments and making ready before a machine can be successfully operated. |
  And I create a another node in workflow
And I fill the details for type section and instruction section
  | Type                    | Instruction                                                                                         |
  | Setting up the machine | Setting Up Machine means the carrying out of final machine adjustments and making ready before a machine can be successfully operated. |
  And I click the node
    | node |
    | 01   |
  # And I click the ARVR section
  # And I click "Choose file" and select "Upload New File"



