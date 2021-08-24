public with sharing class RecordValidationScreenController {
    @AuraEnabled
    public static Wrapper runRecordValidation(Id recordId)
    {
        try
        {
            // recordId here is purely symbolic. In case you want to query the record.
            return (Wrapper) JSON.deserialize(getMockedValidations(), Wrapper.class);
        }
        catch (Exception e)
        {
            throw new AuraHandledException(e.getMessage());
        } 
    }

    private static String getMockedValidations()
    {
        String status = 'warning';
        return '{"amounts":[{"errorList":["Inquiry - Mock Error 1","Inquiry - Mock Error 2"],"name":"Inquiry","warningList":["Inquiry - Mock Warning 1","Inquiry - Mock Warning 2"]},{"errorList":["Inquiry 2 - Mock Error 1","Inquiry 2 - Mock Error 2"],"name":"Inquiry 2","warningList":["Inquiry 2 - Mock Warning 1","Inquiry 2 - Mock Warning 2"]}],"recordName":"Case-00001","messages":[{"errorList":["Message-0001 - Mock Error 1","Message-0001 - Mock Error 2"],"name":"Message-0001","warningList":["Message-0001 - Mock Warning 1","Message-0001 - Mock Warning 2"]},{"errorList":["Message-0002 - Mock Error 1","Message-0002 - Mock Error 2"],"name":"Message-0002","warningList":["Message-0002 - Mock Warning 1","Message-0002 - Mock Warning 2"]}],"status":"' + status + '"}';
    }

    public class Wrapper
    {
        @AuraEnabled public String status;
        @AuraEnabled public String recordId;
        @AuraEnabled public List<ObjectWrapper> messages;
        @AuraEnabled public List<ObjectWrapper> amounts;
    }

    public class ObjectWrapper
    {
        @AuraEnabled public String name;
        @AuraEnabled public List<string> errorList;
        @AuraEnabled public List<string> warningList;
    }

}
