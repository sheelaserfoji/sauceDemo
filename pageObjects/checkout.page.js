const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage extends Page {
    /**
     * define selectors using getter methods
     */
    get firstName() {
        return $('#first-name');
    }

    get lastName() {
        return $('#last-name');
    }

    get zipCode () {
        return $('#postal-code');
    }

    get continue () {
        return $('#continue');
    }

    get itemsPrice () {
        return $('.summary_subtotal_label')
    }

    get taxPrice () {
        return $('.summary_tax_label')
    }

    get totalPrice () {
        return $('.summary_total_label')
    }

    get finish () {
        return $('#finish');
    }

    get backHome () {
        return $('#back-to-products');
    }

    get cancel () {
        return $('#cancel');
    }

    get orderComplete() {
        return $('.complete-header');
    }

    get errorText() {
        return $('.error');
    }
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    
    async verifyPrice() {
        const addedItemsPrice = await browser.execute(()=>{
            return window.addedPrice;
        });
        var priceArray = [];
        for (let i = 0; i < addedItemsPrice.length; i++){
            priceArray.push(Number(addedItemsPrice[i].replace('$','')));
        }
        var subTotalPrice = priceArray.reduce((a, b) => a + b, 0);
        var taxAmt = ((subTotalPrice*8)/100).toFixed(2);
        var totalPrice = subTotalPrice + taxAmt;

        expect (await this.itemsPrice.getText()).toHaveText(subTotalPrice.toString());
        expect (await this.taxPrice.getText()).toHaveText(taxAmt.toString());
        expect (await this.totalPrice.getText()).toHaveText(totalPrice.toString());
        
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

module.exports = new CheckoutPage();
