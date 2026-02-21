const loginPage = require("./LoginPage");
const DashBoardPage = require('./DashBoardPage');
const CartPage = require('./CartPage');
const CheckOutPage = require('./CheckOutPage');
const SuccessfullOrderPage = require('./SuccessfullOrderPage');
const MyOrdersPage = require('./MyOrdersPage');
const OrderIdPage = require('./OrderIdPage');


module.exports = class POManager{

    constructor(page){

        this.page = page
        this.lgnPage = new loginPage(page);
        this.dbPage = new DashBoardPage(page);
        this.cPage = new CartPage(page);
        this.checkPage = new CheckOutPage(page);
        this.sPage = new SuccessfullOrderPage(page);
        this.oPage = new MyOrdersPage(page);
        this.iDPage = new OrderIdPage(page);

    }

    getLoginPage(){

        return this.lgnPage;

    }

    getDashboardPage(){

        return this.dbPage;

    }

    getCartPage(){

        return this.cPage;

    }

    getCheckOutPage(){

        return this.checkPage;

    }

    getSuccessfullOrderPage(){

        return this.sPage;

    }

    myOrdersPage(){

        return this.oPage;

    }

    myOrderIdPage(){

        return this.iDPage;

    }

}