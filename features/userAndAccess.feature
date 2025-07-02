Feature: User creation modificatioN deletion and user access
  As an Admin of the Ucentrics application
  I want to be able to create the user and give them the tenent access 

  Scenario: I log in with valid credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I enter a valid email and password
    And I click the Sign in button
    
    Scenario: I create an user without admin access 
    Given I navigate to the user section and click create user 
    When I create an user without admin access 
    Then I login in with the user and check the user has the admin access 

    Scenario: I edit the non admin user to admin 
    Given I login as an adin user 
    when I edit the user and give them the admin access 
    Then I check the admin access for the added user 

    Scenario: I delete the user and check if the user can access the application
    Given I login with admin user 
    When I delete the added user 
    Then I check the added email has the access to view the page 