const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class BurgerPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnBurgerMenu () {
        return $('#react-burger-menu-btn');
    }

    get menuList(){
        return $('.bm-item-list');
    }
    
    get menuItems () {
        return $$('menu-item');
    }

    get menuAllItems () {
        return $('#inventory_sidebar_link');
    }

    get menuAbout () {
        return $('#about_sidebar_link');
    }

    get menuLogout () {
        return $('#logout_sidebar_link');
    }

    get menuReset () {
        return $('#reset_sidebar_link');
    }

    async verifyMenus () {
        var menuNames=["All Items","About","Reset App State","Logout"];
        var menus= await this.menuItems;
        await menus.forEach( async (el) => {
            var menuName = await el.getText();
            expect(menuNames.indexOf(menuName)).not.toEqual(-1);
        });
    }
   
}

module.exports = new BurgerPage();
