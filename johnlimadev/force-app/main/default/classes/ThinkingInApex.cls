public class ThinkingInApex {
    @testvisible
    private static Boolean fakeAccountInsertionException = false;
    
    public static Boolean disableContactTriggers = false;
    private static Boolean userCacheLoaded = false;
    private static Boolean userIsSpecial = false;
    private static String userTimeZone = null;
    
    public static Boolean isUserSpecial() {
        if (userCacheLoaded) return userIsSpecial;
        cacheUserInfo();
        return userIsSpecial;
	}
    
    public static String userTimeZone() {
        if (userCacheLoaded) return userTimeZone;
        cacheUserInfo();
        return userTimeZone;
	}
    
    public static void cacheUserInfo() {
        if (userCacheLoaded) return;
        User u = [SELECT Id, nhoj__UserIsSpecial__c, TimeZoneSidKey FROM User WHERE ID = :UserInfo.getUserId()];
        userIsSpecial = u.nhoj__UserIsSpecial__c;
        userTimeZone = u.TimeZoneSidKey;
        userCacheLoaded = true;
    }
    
    public static void afterInsertContact(List<Contact> contacts) {
        Set<ID> accountIDs = new Set<ID>();
        for (Contact ct : contacts) 
            if (ct.accountId!=null) accountIDs.add(ct.accountId);
              
        Map<ID, Account> accounts = new Map<ID, Account>([SELECT ID, nhoj__First_Contact_Name__c, nhoj__First_Contact_Email__c FROM Account WHERE ID IN :accountIDs AND nhoj__First_Contact_Name__c = null]);
        if (accounts.size()==0) return;
        
        for (Contact ct : contacts)
            if (ct.accountId!=null) {
                Account act = accounts.get(ct.accountId);
                act.nhoj__First_Contact_Name__c = ((ct.FirstName!=null)? ct.FirstName + ' ' : '' ) + ct.LastName;
                act.nhoj__First_Contact_Email__c = ct.Email;
            }
        
        try {
            if (fakeAccountInsertionException)
                accounts.values()[0].nhoj__First_Contact_Email__c = 'hello';
        	update accounts.values();    
        } catch (Exception ex) {
            System.debug('An exception occurred ' + ex.getMessage());
        }
        
    }
}