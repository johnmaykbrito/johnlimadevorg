public with sharing class ContactController {
    public ContactController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        try {
            return [SELECT Id, Name, Email, Phone FROM Contact];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String searchKey){
        try {
            String key = '%' + searchKey +'%';
            return [SELECT Id, Name, Title, Phone, Email FROM Contact WHERE Name LIKE :key];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}