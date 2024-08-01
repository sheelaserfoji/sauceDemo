Feature: Validate Authentication

  Scenario Outline: As a user, I can log into the e-commerce site with valid credentials and get error message for invalid and empty credentials

    Given I am on the login page
    When I login with <username> username and <password> password
    Then I should see the expected <message> or should be able to login

  Examples:
    | username | password | message  |
    | valid    | valid   | success  |
    | invalid  | invalid  | error    |
    | invalid  | valid    | error    |
    | valid    | invalid  | error    |
    | empty    | empty    | usernameRequired |
    | empty    | valid    | usernameRequired |
    | valid    | empty    | passwordRequired |


  Scenario Outline: As a user, I should see the password field is masked

    Given I am on the login page
    Then I should see the password field is masked

  