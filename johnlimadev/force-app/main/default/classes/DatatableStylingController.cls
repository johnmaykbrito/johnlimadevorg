public with sharing class DatatableStylingController {
    public DatatableStylingController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT Id, Name, AnnualRevenue, Industry, Phone FROM Account WHERE AnnualRevenue != null];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
