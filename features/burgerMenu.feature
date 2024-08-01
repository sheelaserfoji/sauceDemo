Feature: Validate Burger Menu

  Scenario Outline: As a user, I should be able to see the burger menu, its navigation and app reset functionality from Add cart page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    When I click on the cart button
    Then I should navigate to cart page
    Then I should see the burger menu and it is clickable
    When I click the burger menu
    Then I should see the options under burger menu
    When I click All items
    Then I should navigate to products page
    When I click the burger menu
    When I click About
    Then I should navigate to Sauce Lab Home page
    When I click the burger menu
    When I click Logout
    Then I should be on the login page
    When I login with <username> username and <password> password
    Then I should see the cart value still remains <itemsNo> after relogging
    When I click on the cart button
    Then I should navigate to cart page
    When I click the burger menu
    When I click Reset App State
    Then I should not see any cart value
    Then I should see no items in the cart

  Examples:
    | username | password | itemsNo | 
    | valid    | valid   |  3 | 

 Scenario Outline: As a user, I should be able to see the burger menu, its navigation and app reset functionality from Products page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    Then I should see the cart value with the increased items count <itemsNo>
    Then I should see the text changed to Remove for the added <itemsNo> items
    When I click the burger menu
    When I click All items
    Then I should remain in products page
    Then I should see the burger menu is still open
    When I click Reset App State
    Then I should not see any cart value
    Then I should see the text changed back to add to cart for the removed <itemsNo> items

     Examples:
    | username | password | itemsNo |
    | valid    | valid   |  3 |

  Scenario Outline: As a user, I should be able to see the burger menu, its navigation and app reset functionality from individual Product page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I click on the given item <itemNo> 
    Then I should get navigated to the given product page
    When I click add to cart button
    Then I should see the button text changed to Remove
    When I click the burger menu
    When I click All items
    Then I should navigate to products page
    Then I come back
    When I click the burger menu
    When I click Reset App State
    Then I should not see any cart value
    Then I should see the button text changed to Add

  Examples:
    | username | password | itemNo |
    | valid    | valid   |  3 |
    
  