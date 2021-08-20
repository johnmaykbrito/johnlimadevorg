trigger TriggerCase on Case (before update) {
	    
    if (Trigger.isBefore && Trigger.isUpdate) {
        TriggerCaseHandler.changeDescription(trigger.new, trigger.oldMap);
    }
    
    
}