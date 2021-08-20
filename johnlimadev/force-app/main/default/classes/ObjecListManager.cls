@RestResource(urlMapping='/getListOf/*')
global with sharing class ObjecListManager {
    @HttpGet
    global static List<sObject> objectFilter() {
        RestRequest request = RestContext.request;
        // grab the caseId from the end of the URL
        String listType = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        if (listType == 'Opportunities') {
        	return [SELECT Id, Name
                    FROM Opportunity
                    LIMIT 50];
        } else if (listType == 'Leads') {
        	return [SELECT Id, Name
                    FROM Lead
                    LIMIT 50];    
        }
        return null;
    }
}