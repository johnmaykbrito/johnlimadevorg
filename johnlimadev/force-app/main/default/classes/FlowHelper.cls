public class FlowHelper {
    @InvocableMethod(label = 'Get Messages' description = 'Get all Messages of a specific Case with an Apex defined criteria')
    public static List<List<Message__c>> getMessages(List<String> caseIds) {
        String CancelOptions;
        List<List<Message__c>> returnList = new List<List<Message__c>>(); 
        List<Message__c> messages = new List<Message__c>();
        try {
            messages = [SELECT Id, Name, Case__c, Stage__c FROM Message__c WHERE Case__c IN: caseIds];
            returnList.add(messages);
        } Catch(Exception e) {
            System.debug('Error Canceloptions current user: ' + e.getMessage());
        }
        return returnList;
    }
}