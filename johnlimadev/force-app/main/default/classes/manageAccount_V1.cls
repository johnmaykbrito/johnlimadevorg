@RestResource(urlMapping='/acc/')
global class manageAccount_V1 {
    
    @HttpGet
    global static List<Account> getAccount() {
        System.debug('inside getAccount');
        List<Account> listAcc = [SELECT ID, Name FROM Account LIMIT 10];
        return listAcc;
    }
    
    
}