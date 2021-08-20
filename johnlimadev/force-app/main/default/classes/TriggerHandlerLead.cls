public with sharing class TriggerHandlerLead {
    public TriggerHandlerLead() {

    }

    public void testingIsExecutingFromTrigger() {
        System.debug(Trigger.isExecuting);
    }

    public void manageConvertedLeads() {
            List<Lead> convertedLeads = new List<Lead>();
            // Id idRecordTypePME =    Schema.SObjectType.Lead.getRecordTypeInfosByName().get('PME').getRecordTypeId();
            Id idRecordTypePME =    Schema.SObjectType.Lead.getRecordTypeInfosByName().get('A').getRecordTypeId();
            List<Id> idDasPropostasRelacionadas = new List<Id>();

            for (Lead l : (List<Lead>) Trigger.new) {
                if (l.RecordTypeId == idRecordTypePME && l.isConverted == TRUE && l.ConvertedOpportunityId != NULL) {
                    convertedLeads.add(l);
                    idDasPropostasRelacionadas.add(l.ConvertedOpportunityId);
                }
            }

            if (convertedLeads == NULL || convertedLeads.isEmpty()) return;
            Corretora__c corretoraDefault = null;
            try {
                corretoraDefault = [SELECT Id FROM Corretora__c WHERE cnpj__c = '123456' /* Corretora_Default__c = TRUE */];
            } catch (Exception e) {
                System.debug('Não há uma corretora Default');
                return;
            }

            List<Opportunity> propostas = [SELECT Id, Name, Corretora__c FROM Opportunity WHERE Id IN: idDasPropostasRelacionadas];
            for (Opportunity proposta : propostas)
                proposta.Corretora__c = corretoraDefault.Id;
            
            update propostas;
            


    }
}