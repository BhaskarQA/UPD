Feature: Import Workflow 
  As a user of the Ucentrics application
  I must be able to import workflow 
  So that I can construct workflows easily 

    Scenario: I log in with valid credentials
     Given I launch the Ucentrics URL and navigate to the login page
     When I enter a valid email and password
     And I click the Sign in button

    Scenario: I create an workflow and try to import the existing workflow 
     Given  I click on the createWorkflow 
     When I enter the Title and Description for the workflow
     And I click on sumbit workflow button
     And I verify the workflow is created successfull
     And I fill the details for type section and instruction section
        | Type                   | Instruction|
        | Step 1:- Setting up the machine | Setting Up Machine means the carrying out of final machine adjustments and making ready before a machine can be successfully operated.|
     And I Try to import a Workflow without replacing the first node 
     And i upload the required media to it 
     And I click the node
        | node |
        | 01   |
     Then I check the workflow is imported Without Replacing the previous nodes
        | Type                   | Instruction|
        | Step 1:- Setting up the machine | Setting Up Machine means the carrying out of final machine adjustments and making ready before a machine can be successfully operated.|

    Scenario: I Import workflow by replacing the existing nodes
    Given I visit the workflow
    When I import workflow by replacing the nodes 
    And I click the node
        | node |
        | 01   |
    Then I check the workflow is imported by Replacing the previous nodes
        | Type  | Instruction|
        | Step 1| Instruction 1|
