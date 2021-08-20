trigger TriggerAccount on Account (before update, after update, before insert, after insert) {

    AccountTriggerHandler accountTriggerHandlerVar = new AccountTriggerHandler();

    if (Trigger.isBefore && Trigger.isUpdate) {
		accountTriggerHandlerVar.clearSpecialCharactersFromCNPJ(Trigger.new);
        
    } else if (Trigger.isAfter && Trigger.isUpdate) {
        accountTriggerHandlerVar.checarOpps();
        
    } else if (Trigger.isBefore && Trigger.isInsert) {
        accountTriggerHandlerVar.clearSpecialCharactersFromCNPJ(Trigger.new);
        
    } else if (Trigger.isAfter && Trigger.isInsert) {
        // Criar um contato relacionado
        AccountTriggerHandler.criarUmContatoRelacionado(Trigger.new);
    }

}