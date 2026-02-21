const base = require('@playwright/test');



exports.customTest = base.test.extend(

{

    testData: {

        emailID : "nischay123@gmail.com",
        password : "Nischay@123",
        website : "https://rahulshettyacademy.com/client/",
        myProduct : "ZARA COAT 3",
        countryKeyword : "chi",
        desiredCountry : "China",
        thankYouStatement : "Thankyou for the order."

    }

}


)