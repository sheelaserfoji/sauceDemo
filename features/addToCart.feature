Feature: Validate Add To Cart Page

  Scenario Outline: As a user, I should be able to see the cart with added products and price

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    When I click on the cart button
    Then I should navigate to cart page
    Then I should see the cart page with the <itemsNo> added items and its price

  Examples:
    | username | password | itemsNo | 
    | valid    | valid   |  3 | 

  Scenario Outline: As a user, I should be able to continue shopping from add cart page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I click on the cart button
    Then I should navigate to cart page
    When I click on Continue shopping
    Then I should navigate to products page

  Examples:
    | username | password | 
    | valid    | valid   |

  Scenario Outline: As a user, I should be able to do checkout from add cart page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    When I click on the cart button
    Then I should navigate to cart page
    When I click on Checkout
    Then I should navigate to checkout page

  Examples:
    | username | password | itemsNo |
    | valid    | valid   | 2 |
    
  