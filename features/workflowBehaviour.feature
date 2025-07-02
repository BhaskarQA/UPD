Feature: Workflow Feature Behaviour 

 Scenario: I log in with valid credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I enter a valid email and password
    And I click the Sign in button
   #  Then I should be redirected to the dashboard page

   Scenario: Creating workflow  
    Given  I click on the createWorkflow 
    When I enter the Title and Description for the workflow
    And I click on sumbit workflow button
    Then I verify the workflow is created successfull

   Scenario: Adding nodes to the workflow
   #node 1
    When I fill the details for type section and instruction section
        | Type                   | Instruction|
        | Step 1:- Setting up the machine | Setting Up Machine means the carrying out of final machine adjustments and making ready before a machine can be successfully operated.|
    And I Upload Set of Images to the steps
    And I Add forms to the workfolow
    And I Fill up the forms 
    
    #node 2
    And I create a another node in workflow
    And I fill the details for type section and instruction section
        | Type                   | Instruction|
        | Step 2:- Setting up the machine | Setting Up Machine means the carrying out of final machine adjustments and making ready before a machine can be successfully operated.|
    And I Add forms to the workfolow
    And I Fill up the forms

    #node 3
    #And I create a another node in workflow
    #And I fill the details for type section and instruction section
    #    | Type                   | Instruction|
    #    | Step 3:- Setting up the machine | Setting Up Machine means the carrying out of final machine adjustments and making ready before a machine can be successfully operated.|
    #And I Add forms to the workfolow
    #And I Fill up the forms
   
   Scenario: check multitenent access
   
    Given I get the workflow URL
    When I modify the tenent in the URL and vivit the page
    Then The page must not be accessable 
   
   Scenario: Delete workflow
    Given I visit the editing workflow 
    When I delete the workflow 
    Then I check the workflow is deleted 