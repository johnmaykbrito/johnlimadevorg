public with sharing class PocShowDatatableController {
    public PocShowDatatableController() {

    }

    @AuraEnabled
    public static List<Account> findAccounts() {
        try {
            return [SELECT Id, Name, AccountNumber FROM Account LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
