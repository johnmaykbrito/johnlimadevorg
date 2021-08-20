global with sharing class RetornaAccounts {
    global RetornaAccounts() {
    }
    @AuraEnabled
    global static Account[] retornaContas(){
        return [SELECT Id, Name FROM Account LIMIT 10];
    }
}