const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')
const { decrypt } = require('../features/support/encryption.js');

const LoginPage = require('../pageObjects/login.page');
const ProductsPage = require('../pageObjects/products.page');
const itemPage = require('../pageObjects/item.page');
const BurgerPage = require('../pageObjects/burger.page');
const CartPage = require('../pageObjects/cart.page');
const CheckoutPage = require('../pageObjects/checkout.page');
const testData = require('../testData/testData.json');

const pages = {
    login: LoginPage
}

const clickAddCart = async () => {
    await itemPage.btnAddToCart.click();
};

const verifyLandingProducts = async () => {
    await expect(browser).toHaveUrlContaining("inventory.html");
}; 

Given(/^I am on the login page$/, async () => {
    await browser.url('https://www.saucedemo.com');
    await browser.maximizeWindow();
});

When(/^I login with (.*) username and (.*) password$/, async (user, pass) => {
    var userObj=testData[user][0];
    var passObj=testData[pass][0];
    var passwd ;
    if (pass=='valid') {
        const encryptedPassword = passObj.password.toString();
        const decryptedPassword = decrypt(encryptedPassword);
        passwd=decryptedPassword;
    }
    else {
        passwd= passObj.password;
    }
    await LoginPage.login(userObj.username, passwd)
});

Then(/^I should see the password field is masked$/, async () => {
    var elem = await LoginPage.inputPassword;
    await expect(await elem.getAttribute("type")).toEqual("password");
    await elem.setValue("password");
    var passwordText = await LoginPage.getPaswordText();
    await expect(passwordText).toBe.empty;
});

Then(/^I should see the expected (.*) or should be able to login$/, async (message) => {
    if (message=="success") {
        await expect(browser).toHaveUrlContaining("inventory.html");
    }
    else if(message.toLowerCase().includes("required")){
        var errObj=testData[message.slice(-8).toLowerCase()][0];
        var reqdMsg= message.replace(message.slice(-8),"")
        await expect(LoginPage.errorText).toBeDisplayed();
        await expect(LoginPage.errorText).toHaveTextContaining(errObj[reqdMsg])
    }
    else {
        var errObj=testData[message][0];
        await expect(LoginPage.errorText).toBeDisplayed();
        await expect(LoginPage.errorText).toHaveTextContaining(errObj.errText);
    }
  
});

Then(/^I should be able to login$/, verifyLandingProducts);
Then(/^I should navigate to products page$/, verifyLandingProducts);
Then(/^I should remain in products page$/, verifyLandingProducts);

Then(/^I should see the burger menu and it is clickable$/, async () => {
    await expect(BurgerPage.btnBurgerMenu).toBeDisplayed();
    await expect(BurgerPage.btnBurgerMenu).toBeClickable();
});

Then(/^I should see the cart$/, async () => {
    await expect(CartPage.btnCart).toBeDisplayed();
});

Then(/^I should see the text Products$/, async () => {
    await expect(ProductsPage.titleProducts).toBeDisplayed();
    await expect(ProductsPage.titleProducts).toHaveText("Products");
});

Then(/^I should see the list of products available$/, async () => {
    await ProductsPage.verifyProducts();
});

Then(/^I should see the Sort button with default value$/, async () => {
    await expect(ProductsPage.btnSort).toBeDisplayed();
    await expect(ProductsPage.btnSort).toHaveText("Name (A to Z)");
});

Then(/^I should see the content of sort drop down$/, async () => {
    await ProductsPage.sortDropDwn.click();
    await expect(ProductsPage.sortDropDwn).toBeDisplayed();
    await ProductsPage.verifySortDropDwn();
});

Then(/^I should be able to sort based on (.*)$/, async (order) => {
    await ProductsPage.verifySort(order);
});

When(/^I click on the given item (.*)$/, async (itemNo) => {
    await ProductsPage.openItem(itemNo);
});

Then(/^I should get navigated to the given product page$/, async () => {
    await itemPage.verifyProdDetails();
});

Then(/^I should see add to cart button$/, async () => {
    await expect(itemPage.btnAddToCart).toBeDisplayed();
});

Then(/^I should see back to products link$/, async () => {
    await expect(itemPage.backToPrds).toBeDisplayed();
});

When(/^I click on back to products$/, async () => {
    await itemPage.backToPrds.click();
});

When(/^I add (.*) items to the cart$/, async (noOfItems) => {
    await ProductsPage.addItemsToCart(noOfItems);
});

Then(/^I should see the cart value with the increased items count (.*)$/, async (itemsNo) => {
    await expect(CartPage.cartValue).toHaveText(itemsNo);
});

Then(/^I should see the cart value still remains (.*) after relogging$/, async (itemsNo) => {
    await expect(CartPage.cartValue).toHaveText(itemsNo);
});

Then(/^I should see the text changed to Remove for the added (.*) items$/, async (itemsNo) => {
    await ProductsPage.verifyBtnTextRemove(itemsNo);
});

Then(/^I should see the text changed back to add to cart for the removed (.*) items$/, async (itemsNo) => {
        await ProductsPage.verifyBtnTextAdd(itemsNo);
});

When(/^I remove (.*) items$/, async (noOfItems) => {
    await ProductsPage.removeFromCart(noOfItems);
});

Then(/^I should see the cart value updated after removing (.*) items from (.*) items$/, async (itemsRemove,itemsNo) => {
    var expCartVal = Number(itemsNo)-Number(itemsRemove);
    await expect(CartPage.cartValue).toHaveText(expCartVal.toString());
});

When(/^I click on the cart button$/, async () => {
    await CartPage.btnCart.click();
});

Then(/^I should navigate to cart page$/, async () => {
    await expect(browser).toHaveUrlContaining("cart.html");
});

When(/^I click add to cart button$/, clickAddCart);
When(/^I click remove button$/, clickAddCart);

Then(/^I should see the existing cart value$/, async () => {
    await CartPage.getCurrentCartValue();
});

Then(/^I should see the cart value increased by one$/, async () => {
    await CartPage.verifyCartValue();
});

Then(/^I should see the button text changed to (\w+)$/, async (btnText) => {
        await expect(itemPage.btnAddToCart).toHaveTextContaining(btnText);
});

Then(/^I should not see any cart value$/, async () => {
    await CartPage.verifyEmptyCart();
});

When(/^I click on Continue shopping$/, async () => {
    await CartPage.btnContShopping.click();
});

When(/^I click on Checkout$/, async () => {
    await CartPage.btnCheckout.click();
});

Then(/^I should navigate to checkout page$/, async () => {
    await expect(browser).toHaveUrlContaining("checkout-step-one.html");
});

When(/^I click the burger menu$/, async () => {
    await BurgerPage.btnBurgerMenu.click();
});

Then(/^I should see the options under burger menu$/, async () => {
    await BurgerPage.verifyMenus();
});

Then(/^I should see the burger menu is still open$/, async () => {
    await expect(BurgerPage.menuList).toBeDisplayed();
});

When(/^I click All items$/, async () => {
    await BurgerPage.menuAllItems.click();
});

When(/^I click About$/, async () => {
    await BurgerPage.menuAbout.click();
});

Then(/^I should navigate to Sauce Lab Home page$/, async () => {
    await expect(browser).toHaveUrlContaining("saucelabs.com");
    await browser.back();
});

When(/^I click Logout$/, async () => {
    await BurgerPage.menuLogout.click();
});

Then(/^I should be on the login page$/, async () => {
    await expect(browser).toHaveUrlContaining("saucedemo.com");
});

When(/^I click Reset App State$/, async () => {
    await BurgerPage.menuReset.click();
});

Then(/^I should see no items in the cart$/, async () => {
    await CartPage.verifyNoItems();
});

Then(/^I should see the cart page with the (.*) added items and its price$/, async (noItems) => {
    await CartPage.verifyCartItems(noItems);
});


Then(/^I come back$/, async () => {
    await browser.back();
});

Then(/^I enter First Name (.*)$/, async (firstName) => {
    var elem = await CheckoutPage.firstName;
    await elem.setValue(firstName);
});


Then(/^I enter Last Name (.*)$/, async (lastName) => {
    var elem = await CheckoutPage.lastName;
    await elem.setValue(lastName);
});

Then(/^I enter Postal Code (.*)$/, async (zip) => {
    var elem = await CheckoutPage.zipCode;
    await elem.setValue(zip);
});

When(/^I click Continue$/, async () => {
    await CheckoutPage.continue.click();
});

Then(/^I should navigate to checkout two page$/, async () => {
    await expect(browser).toHaveUrlContaining("checkout-step-two.html");
});

Then(/^I should see the items price, tax and total amount of the cart$/, async () => {
    await CheckoutPage.verifyPrice();
});

When(/^I click Finish$/, async () => {
    await CheckoutPage.finish.click();
});

Then(/^I should see (.*) in Order Completion Page$/, async (message) => {
    await expect(CheckoutPage.orderComplete).toBeExisting();
    await expect(CheckoutPage.orderComplete).toHaveTextContaining(message);
});

Then(/^I should get error message in checkout page$/, async () => {
    await expect(await CheckoutPage.errorText.isDisplayed()).toEqual(true);
});

When(/^I click Back Home in checkout page$/, async () => {
    await CheckoutPage.backHome.click();
});

When(/^I click Cancel in Checkout page$/, async () => {
    await CheckoutPage.cancel.click();
});
