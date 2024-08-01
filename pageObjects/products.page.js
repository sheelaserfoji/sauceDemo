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
    get titleProducts () {
        return $('.title');
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

    get btnSort () {
        return $('.active_option');
    }

    get sortDropDwn () {
        return $('.product_sort_container');
    }

    get sortDropDwnContent () {
        return $$('.product_sort_container option');
    }

    get btnAddToCart(){
        return $$(".btn_inventory");
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async verifySortDropDwn () {
        var sortNames=["Name (A to Z)","Name (Z to A)","Price (low to high)","Price (high to low)"];
        var sortList= await this.sortDropDwnContent;
        await sortList.forEach( async (el) => {
            var sortName = await el.getText();
            expect(sortNames.indexOf(sortName)).not.toEqual(-1);
        });
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
        var item = await this.productsList[itemNo];
        const itemText = await item.getText();
        await browser.execute(async (itemText)=>{
            window.itemName = itemText;
        },itemText);
        await this.productsList[itemNo].click();
        expect(browser).toHaveUrlContaining('inventory-item');
    }

    async addItemsToCart(noOfItems) {
        var addedItems = [];
        var addedPrice = [];
        for (let item=0;item<noOfItems;item++) {
            await this.btnAddToCart[item].click();
            let itemName = await (this.productsList[item].getText());
            let itemPrice = await this.productsPrice[item].getText();
            addedItems.push(itemName);
            addedPrice.push(itemPrice);
        }  
        await browser.execute(async (addedItems)=>{
            window.addedItems = addedItems;
        },addedItems);

        await browser.execute(async (addedPrice)=>{
            window.addedPrice = addedPrice;
        },addedPrice);
    }
   
    async verifyBtnTextRemove(noOfItems) {
        for (let item=0;item<noOfItems;item++) {
            let btnText = await this.btnAddToCart[item].getText();
            expect(btnText).toEqual("Remove");
        }  
    }

    async removeFromCart(noOfItems) {
        for (let item=0;item<noOfItems;item++) {
            await this.btnAddToCart[item].click();
        }  
    }

    async verifyBtnTextAdd(noOfItems) {
        for (let item=0;item<noOfItems;item++) {
            let btnText = await this.btnAddToCart[item].getText();
            expect(btnText.toLowerCase()).toEqual("add to cart");
        }  
    }
}

module.exports = new ProductsPage();
