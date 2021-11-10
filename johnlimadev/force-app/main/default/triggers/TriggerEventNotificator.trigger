trigger TriggerEventNotificator on Account_Update__e (after insert) {
    List<Case> cases = new List<Case>();
    for (Account_Update__e e: (List<Account_Update__e >) Trigger.new) {
        cases.add(new Case(AccountId = e.AccountId__c, Subject = e.AccountName__c));
    }
    insert cases;
}