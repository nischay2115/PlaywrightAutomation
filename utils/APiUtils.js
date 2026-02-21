module.exports = class APiUtils
{

    constructor(apiContext, loginPayLoadData)
    {
        this.apiContext = apiContext;
        this.loginPayLoadData = loginPayLoadData;
    }


    async getToken()
    {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
                    {
                        data: this.loginPayLoadData
                    });
        const jsonBody = await loginResponse.json();
        
        const token = jsonBody.token;

        return token;
    }


    async getOrderID(orderPayloadData)
    {   

        let response = {}; //Javascript object
        response.token = await this.getToken();


        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
                                    {
                                        data: orderPayloadData,
                                        headers: 
                                                {
                                                    'Authorization' : response.token,
                                                    'content-type' : 'application/json'
                                                },
                                    });                 
                
        const orderJsonBody = await orderResponse.json();
        const exactOrderID = orderJsonBody.orders[0];
        response.OrderID = exactOrderID;

        return response;


    }

}