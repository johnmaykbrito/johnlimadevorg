public with sharing class LookupUserController {

    @AuraEnabled
    public static ResponseWrapper getUsers(String searchKey)
    {
        try 
        {
            String key;
            List<SObject> objects;
            if (!String.isBlank(searchKey)) {
                key = '%' + searchKey + '%';
                objects = [SELECT Id, Name, Username, Email FROM User WHERE Name LIKE :key];
            }
            ResponseWrapper responseWrapper = new ResponseWrapper();
            responseWrapper.objects = objects;
            return responseWrapper;
        }
        catch(Exception e)
        {
            return null;
        }
    }

    public class ResponseWrapper
    {   
        @AuraEnabled
        public List<SObject> objects = new List<SObject>();
    }
}
