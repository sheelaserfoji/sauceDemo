const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnCart () {
        return $('#shopping_cart_container');
    }

    get cartValue () {
        return $('.shopping_cart_badge');
    }

    get productsList () {
        return $$('.inventory_item_name');
    }

    get productsDescription () {
        return $$('.inventory_item_desc');
    }

    get productsPrice () {
        return $$('.inventory_item_price');
    }

    get cartQuantity() {
        return $$('.cart_quantity');
    }

    get btnContShopping() {
        return $('#continue-shopping');
    }

    get btnCheckout() {
        return $('#checkout');
    }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async verifyEmptyCart() {
        const cartValue=await $('.shopping_cart_badge').isExisting();
        expect(cartValue).toBe.false;
    }

    async getCurrentCartValue() {    
        const cartVal = await this.cartValue.getText();
        await browser.execute(async (cartVal)=>{
            window.cartValue = cartVal;
        },cartVal);
    }

    async verifyCartValue() {
        const oldCartValue = await browser.execute(()=>{
            return window.cartValue;
        });
        var newCartValue = await this.cartValue.getText();
        await expect(newCartValue).toEqual((Number(oldCartValue) + 1).toString());
    }

    async verifyCartItems(noItems){
        var prod= await this.productsList;
        expect(prod.length).toEqual(Number(noItems));
        const addedItemsName = await browser.execute(()=>{
            return window.addedItems;
        });
        var prodPrice = this.productsPrice;
        const addedItemsPrice = await browser.execute(()=>{
            return window.addedPrice;
        });

        var qty= await this.cartQuantity;
        expect(qty.length).toEqual(Number(noItems));

        for (let lp=0;lp<prod.length;lp++) {
            var actualProductName=await prod[lp].getText();
            var actualProductPrice=await prodPrice[lp].getText();
            var actualQty = await qty[lp].getText();
            expect(addedItemsName.indexOf(actualProductName)).not.toEqual(-1);
            expect(addedItemsPrice.indexOf(actualProductPrice)).not.toEqual(-1);
            expect(actualQty).toEqual("1");
        }
    }

    async  verifyNoItems(){
        var prod= await this.productsList;
        expect(prod.length).toEqual(0);
    }
   
}

module.exports = new CartPage();
