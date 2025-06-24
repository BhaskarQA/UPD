Feature: User Login
  As a user of the Ucentrics application
  I want to be able to login with valid credentials
  So that I can access the application features

  Scenario: I log in with valid credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I enter a valid email and password
    And I click the Sign in button
    Then I should be redirected to the dashboard page
    And I should verify the page title

  Scenario: Failed login with invalid credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I enter invalid username and password
    And I click the Sign in button
    Then I should see an error message

  Scenario: Failed login with empty credentials
    Given I launch the Ucentrics URL and navigate to the login page
    When I leave username and password fields empty
    And I click the Sign in button
    Then I should see validation error messages