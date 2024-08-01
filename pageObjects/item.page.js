const { $ } = require('@wdio/globals')
const Page = require('./page');

const productsData = require('../testData/products.json');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get itemName () {
        return $('.inventory_details_name');
    }

    get itemPrice () {
        return $('.inventory_details_price');
    }

    get btnAddToCart () {
        return $('.btn_inventory');
    }

    get backToPrds () {
        return $('#back-to-products');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async verifyProdDetails () {
        const expectedItemName = await browser.execute(()=>{
            return window.itemName;
        });
        var actualItemName = await this.itemName.getText();
        expect(actualItemName).toEqual(expectedItemName);
    }

    async verifySort(order) {
        await this.sortDropDwn.selectByAttribute("value",order);
        var prod= await this.productsList;
        var products=productsData["productsList"];
        switch (order) {
            case 'az' :
                products.sort((a,b)=> (a.productName > b.productName ? 1 : -1));
                break;
            case 'za' :
                products.sort((a,b)=> (a.productName < b.productName ? 1 : -1));
                break;
            case 'hilo' :
                products.sort((a,b)=>{
                    if(Number(a.productPrice.replace('$','')) === Number(b.productPrice.replace('$',''))) {
                        return a.productName.localeCompare(b.productName);
                    }
                    else {
                        return Number(b.productPrice.replace('$','')) - Number(a.productPrice.replace('$',''));
                    }
                }); 
                break;
            case 'lohi' :
                products.sort((a,b)=>{
                    if(Number(a.productPrice.replace('$','')) === Number(b.productPrice.replace('$',''))) {
                        return a.productName.localeCompare(b.productName);
                    }
                    else {
                        return Number(a.productPrice.replace('$','')) - Number(b.productPrice.replace('$',''));
                    }
                }); 
                break;
        }
        for (let lp=0;lp<prod.length;lp++) {
            var actualProductName=await prod[lp].getText();
            expect(products[lp].productName).toEqual(actualProductName);
        }
    }
    
    async verifyProducts () {
        var products=productsData["productsList"];
        var prod= await this.productsList;
        var prodDesc = await this.productsDescription;
        var prodPrice = await this.productsPrice;
        for (let lp=0;lp<prod.length;lp++) {
            var actualProductName=await prod[lp].getText();
            let matchedProduct = products.filter(product => product.productName==actualProductName);
            expect (prodDesc[lp]).toHaveText(matchedProduct[0].productDescription);
            expect (prodPrice[lp]).toHaveText(matchedProduct[0].productPrice);
        }
    }

    async openItem(itemNo) {
        var itemName =this.productsList[itemNo].getText();
        window.itemName = itemName;
        await this.productsList[itemNo].click();
        expect(browser).toHaveUrlContaining('inventory-item');
    }
   
}

module.exports = new ProductsPage();
