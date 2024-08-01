Feature: Validate Checkout Page

  Scenario Outline: As a user, I should be able to add items to the cart, proceed to checkout, price details are calculated correctly and complete the order

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    When I click on the cart button
    Then I should navigate to cart page
    Then I should see the cart page with the <itemsNo> added items and its price
    When I click on Checkout
    Then I should navigate to checkout page
    Then I enter First Name <fName>
    Then I enter Last Name <lName>
    Then I enter Postal Code <zipCode>
    When I click Continue
    Then I should navigate to checkout two page
    Then I should see the cart page with the <itemsNo> added items and its price
    Then I should see the items price, tax and total amount of the cart
    When I click Finish
    Then I should see <message> in Order Completion Page
    When I click Back Home in checkout page
    Then I should navigate to products page


  Examples:
    | username | password | itemsNo | fName | lName|zipCode| message |
    | valid    | valid   |  3 | tom| smith| 83464| Thank you for your order!|
    

  Scenario Outline: As a user, I should get error message when giving invalid or empty first name last name and zipCode in checkout page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    When I click on the cart button
    Then I should navigate to cart page
    When I click on Checkout
    Then I should navigate to checkout page
    Then I enter First Name <fName>
    Then I enter Last Name <lName>
    Then I enter Postal Code <zipCode>
    When I click Continue
    Then I should get error message in checkout page

  Examples:
    | username | password | itemsNo | fName | lName|zipCode|
    | valid    | valid   |  3 | | | |
    | valid    | valid   |  3 |test | | |
    | valid    | valid   |  3 |test | test| |
  

  Scenario Outline: As a user, I should be able to cancel in checkout one page and go back to add cart page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    When I click on the cart button
    Then I should navigate to cart page
    When I click on Checkout
    Then I should navigate to checkout page
    When I click Cancel in Checkout page
    Then I should navigate to cart page

    Examples:
      | username | password | itemsNo |
      | valid    | valid   | 3|

  
  Scenario Outline: As a user, I should be able to cancel in checkout two page and go back to products page

    Given I am on the login page
    When I login with <username> username and <password> password
    When I add <itemsNo> items to the cart 
    When I click on the cart button
    Then I should navigate to cart page
    When I click on Checkout
    Then I should navigate to checkout page
    Then I enter First Name <fName>
    Then I enter Last Name <lName>
    Then I enter Postal Code <zipCode>
    When I click Continue
    Then I should navigate to checkout two page
    When I click Cancel in Checkout page
    Then I should navigate to products page

    Examples:
      | username | password | itemsNo |fName | lName|zipCode|
      | valid    | valid   | 3| test| test| 453345|

    
  