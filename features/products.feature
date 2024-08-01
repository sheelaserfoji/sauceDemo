Feature: Validate Products Page

  Scenario Outline: As a user, I should be able to see the products, burger menu, cart on successful login

    Given I am on the login page
    When I login with <username> username and <password> password
    Then I should be able to login
    Then I should see the burger menu and it is clickable
    Then I should see the cart
    Then I should see the text Products
    Then I should see the list of products available
    Then I should see the Sort button with default value


  Examples:
    | username | password | 
    | valid    | valid   | 

  
  Scenario Outline: As a user, I should be able to see the content of sort drop down and able to sort based on name and price

    Given I am on the login page
    When I login with <username> username and <password> password
    Then I should be able to login
    Then I should see the content of sort drop down
    Then I should be able to sort based on <order>

  Examples:
    | username | password | sort | order|
    | valid    | valid   |  name | az|
    | valid    | valid   |  name | za|
    | valid    | valid   |  name | hilo|
    | valid    | valid   |  name | lohi|

  Scenario Outline: As a user, I should be able to navigate to item page when clicking on any specific item in products page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I click on the given item <itemNo> 
    Then I should get navigated to the given product page
    Then I should see add to cart button
    Then I should see back to products link
    When I click on back to products
    Then I should navigate to products page

  Examples:
    | username | password | itemNo | 
    | valid    | valid   |  1 |

  Scenario Outline: As a user, I should be able to add or remove any product to the cart from products page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    Then I should see the cart value with the increased items count <itemsNo>
    Then I should see the text changed to Remove for the added <itemsNo> items
    When I remove <removeItems> items
    Then I should see the text changed back to add to cart for the removed <removeItems> items
    Then I should see the cart value updated after removing <removeItems> items from <itemsNo> items
    When I click on the cart button
    Then I should navigate to cart page

  Examples:
    | username | password | itemsNo | removeItems |
    | valid    | valid   |  3 | 1 |

  Scenario Outline: As a user, I should be able to add or remove any product to the cart from the individual product page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I click on the given item <itemNo> 
    Then I should get navigated to the given product page
    Then I should see the existing cart value
    When I click add to cart button
    Then I should see the cart value increased by one
    Then I should see the button text changed to Remove
    When I click remove button
    Then I should not see any cart value
    Then I should see the button text changed to Add
    When I click on the cart button
    Then I should navigate to cart page

  Examples:
    | username | password | itemNo |
    | valid    | valid   |  3 |
    
  