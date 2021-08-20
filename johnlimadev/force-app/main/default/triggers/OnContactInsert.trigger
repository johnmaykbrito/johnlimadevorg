trigger OnContactInsert on Contact (after insert) {
    System.debug('Rodou o Trigger de Contato');
    if (ThinkingInApex.disableContactTriggers) return;
	ThinkingInApex.afterInsertContact(trigger.new);
}