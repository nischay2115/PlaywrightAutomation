Feature: Ecommerce validations


    @Ecommerce
    Scenario: Placing the Order
        Given login to Ecommerce app using credentials "nischay123@gmail.com" and "Nischay@123"
        When "ZARA COAT 3" is added to cart
        Then "ZARA COAT 3" will be in the cart
        When order is placed with valid country details "chi" and "China"
        Then My order is in Order History with "Thankyou for the order." statement