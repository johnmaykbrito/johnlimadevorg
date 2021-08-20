global with sharing class BatchAccount implements Database.Batchable<sObject> {
    global BatchAccount() {
    }

    global Database.QueryLocator start(Database.BatchableContext bc) {
        // collect the batches of records or objects to be passed to execute
        return Database.getQueryLocator(
            'SELECT ID, BillingStreet, BillingCity, BillingState, ' +
            'BillingPostalCode, (SELECT ID, MailingStreet, MailingCity, ' +
            'MailingState, MailingPostalCode FROM Contacts) FROM Account'
            );
    }
    global void execute(Database.BatchableContext bc, List<Account> records) {
        // process each batch of records
        System.debug(records.size());
    }    
    global void finish(Database.BatchableContext bc) {
        // execute any post-processing operations
    } 


}