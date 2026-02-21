Feature: Error Validations

    @Verification
    Scenario: Placing the Order
        Given login to website using invalid credentials "123nischay123@gmail.com" and "Nischay@123@123"
        Then Verify error message is displayed