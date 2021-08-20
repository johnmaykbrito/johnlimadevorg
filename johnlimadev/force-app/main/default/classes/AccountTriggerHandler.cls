public with sharing class AccountTriggerHandler {
    public AccountTriggerHandler() {

    }
    
    public void clearSpecialCharactersFromCNPJ(List<Account> accounts) {
        System.debug(accounts);
        for (Account acc : accounts) {
            if (acc.CNPJ__c != null) {
            	acc.CNPJ__c = acc.CNPJ__c.replaceAll('\\D','');    
            }
            
        }
    }


    // after update accounts
    public void checarOpps() {
        List<Account> accounts = (List<Account>) Trigger.new;

        Id pme = NULL, ge = NULL;
        try {
            pme = Schema.SObjectType.Opportunity.getRecordTypeInfosByName().get('Green RT').getRecordTypeId();
            ge = Schema.SObjectType.Opportunity.getRecordTypeInfosByName().get('Yellow RT').getRecordTypeId();
        } catch(Exception e) {
            System.debug('Deu ruim');
        }
        
        List<Id> accountsComOwnerAlterado = new List<Id>();
        for (Account account : accounts) {
            Account oldAccount = (Account) Trigger.oldMap.get(account.Id);
            if (account.OwnerId != oldAccount.OwnerId) { // se o Onwer foi alterado
                System.debug('Owner foi alterado ' + account.Id);
                accountsComOwnerAlterado.add(account.Id);
            }
        }

        List<Opportunity> propostas = [SELECT Id, Name, RecordTypeId, OwnerId, Owner.Name FROM Opportunity WHERE AccountId IN: accountsComOwnerAlterado];

        for (Opportunity proposta : propostas) {
            System.debug(proposta);
            System.debug(proposta.Owner.Name);
            if (/* o owner da Proposta for do perfil PME && o TipoDeRegistro da proposta for GE*/false) {
                // Mudar Tipo de Registro da proposta para PME
                proposta.RecordTypeId = pme;
            } else if (/* o owner da Proposta for do perfil GE && o TipoDeRegistro da proposta for PME*/false) {
                // Mudar Tipo de Registro da proposta para GE
                proposta.RecordTypeId = ge;
            }
        }

        // Update Propostas
        Database.SaveResult[] srList = Database.update(propostas, false);

        // Iterate through each returned result
        for (Database.SaveResult sr : srList) {
            if (sr.isSuccess()) {
                // Operation was successful, so get the ID of the record that was processed
                System.debug('Successfully updated opportunity. Opportunity ID: ' + sr.getId());
            }
            else {
                // Operation failed, so get all errors                
                for(Database.Error err : sr.getErrors()) {
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Opportunity fields that affected this error: ' + err.getFields());
                }
            }
        }
    }
    
    public static void criarUmContatoRelacionado(List<Account> accounts) {
        
        List<Contact> contatos = new List<Contact>();
        for (Account acc : accounts) {
			Contact contato = new Contact();
            contato.AccountId = acc.Id;
            contato.FirstName = 'Pedro';
            contato.LastName = 'Pedro';
            contato.Email = 'Pedro_' + acc.Id + '@Pessoa.com';
            contatos.add(contato);
        }
        System.debug(contatos);
        insert contatos;
    }
}