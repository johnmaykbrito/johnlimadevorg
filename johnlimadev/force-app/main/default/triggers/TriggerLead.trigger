trigger TriggerLead on Lead (before update, after update, after insert) {

    private TriggerHandlerLead thl = new TriggerHandlerLead();

    if (Trigger.isBefore) {
        if (Trigger.isUpdate) {
            System.debug('BEFORE UPDATE');
            for (Lead lead : Trigger.new) {
                System.debug(lead.Pessoa__c);
                System.debug(lead.Pessoa__r.Name);
            }
        }
    } else if (Trigger.isAfter) {
        if (Trigger.isUpdate) {
            thl.manageConvertedLeads();
        }
    }
}