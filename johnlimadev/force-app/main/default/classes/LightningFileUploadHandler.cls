public class LightningFileUploadHandler {
    
    @AuraEnabled  
    public static List<ContentDocument> getFiles(string recordId){ 
        // TO avoid following exception 
        // System.QueryException: Implementation restriction: ContentDocumentLink requires
        // a filter by a single Id on ContentDocumentId or LinkedEntityId using the equals operator or 
        // multiple Id's using the IN operator.
        // We have to add sigle record id into set or list to make SOQL query call
        Set<Id> recordIds=new Set<Id>{recordId};
        Set<Id> documentIds = new Set<Id>(); 
        List<ContentDocumentLink> cdl=[SELECT id,LinkedEntityId,ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId IN:recordIds];  
        for(ContentDocumentLink cdLink:cdl){  
            documentIds.add(cdLink.ContentDocumentId);  
        }      
        return [SELECT Id,Title,FileType FROM ContentDocument WHERE id IN: documentIds];  
    } 
    
    @AuraEnabled  
    public static void deleteFiles(string sdocumentId){ 
        delete [SELECT Id,Title,FileType from ContentDocument WHERE id=:sdocumentId];       
    }  
 }

// http://salesforcescool.blogspot.com/2019/03/file-upload-lightning-component-using.html
// https://developer.salesforce.com/forums/?id=906F0000000Ax5sIAC
// https://webkul.com/blog/parsing-xml-file-apex/
// List<ContentVersion> cvs = [Select Id, Title, VersionData, contentBodyId From ContentVersion];
// System.debug(cvs);
// String s = cvs[0].VersionData.toString();
// s = EncodingUtil.base64Decode(EncodingUtil.base64Encode(cvs[0].VersionData)).toString();
// //System.debug(cvs[0].VersionData.toString());

// Dom.Document doc = new Dom.Document();
// doc.load(s);
// System.debug(doc.getRootElement());