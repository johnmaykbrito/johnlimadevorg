@istest
public class TestThinkingInApex {
    @istest
    public static void TestSetFirstContactName() {
    	List<Account> accounts = new List<Account>{
        	new Account(name='a1'), new Account(name='a2')};
        insert accounts;
        
        Test.StartTest();
        List<Contact> contacts = new List<Contact>{
            new Contact(LastName='c1', Email='c1@c1.com', AccountId=accounts[0].Id),
            new Contact(LastName='c2', Email='c2@c2.com', AccountId=accounts[1].Id)};
        insert contacts;
        Test.StopTest();
        
        Map<ID, Account> actResults = new Map<ID, Account>([SELECT ID, nhoj__First_Contact_Name__c, nhoj__First_Contact_Email__c FROM Account]);
        
        for (Contact ct: contacts) {
            Account actToTest = actResults.get(ct.AccountId);
            System.assertEquals(ct.LastName, actToTest.nhoj__First_Contact_Name__c);
            System.assertEquals(ct.Email, actToTest.nhoj__First_Contact_Email__c);
        }
    }
    
    @istest
    public static void TestFakeInsertionOfAcocunt() {
    	List<Account> accounts = new List<Account>{
        	new Account(name='a1'), new Account(name='a2')};
        insert accounts;
        
        Test.StartTest();
        List<Contact> contacts = new List<Contact>{
            new Contact(LastName='c1', Email='c1@c1.com', AccountId=accounts[0].Id),
            new Contact(LastName='c2', Email='c2@c2.com', AccountId=accounts[1].Id)};
        ThinkingInApex.fakeAccountInsertionException = true;
        insert contacts;
        Test.StopTest();
        
        Map<ID, Account> actResults = new Map<ID, Account>([SELECT ID, nhoj__First_Contact_Name__c, nhoj__First_Contact_Email__c FROM Account]);
        
        for (Contact ct: contacts) {
            Account actToTest = actResults.get(ct.AccountId);
            System.assertNotEquals(ct.LastName, actToTest.nhoj__First_Contact_Name__c);
            System.assertNotEquals(ct.Email, actToTest.nhoj__First_Contact_Email__c);
        }
    }
    
    
}