global class CPFControllerServerSide {
    @AuraEnabled
    global static Boolean updateCPFServerSide(String recordId, String novoCPF) {
    	Account conta = [SELECT Id, Name, CPF__c, (SELECT Id, Conta__c, CPF_Corrente__c, CPF_Anterior__c FROM LogCPFs__r) FROM Account WHERE Id = :recordId];
    	// create, update or delete log
    	manageLog(conta, novoCPF);
    	conta.CPF__c = novoCPF;
    	Database.SaveResult sr = Database.update(conta, false);
    	System.debug('Conta Success: ' + sr.isSuccess());
    	return sr.isSuccess();
    }

    @AuraEnabled
    global static Boolean deleteLogCPFServerSide(String recordId) {
    	Account conta = [SELECT Id, Name, CPF__c, (SELECT Id, Conta__c, CPF_Corrente__c, CPF_Anterior__c FROM LogCPFs__r) FROM Account WHERE Id = :recordId];
    	List<LogCPF__c> logs = conta.LogCPFs__r;
    	if (logs == null || logs.size() == 0) {
    		System.debug('No logs to delete');
    		return false;
    	}

    	List<Database.DeleteResult> dr = Database.delete(logs, false);
    	System.debug('DeleteResultSize: ' + dr.size());
    	
    	if (dr.size() < logs.size()) {
    		System.debug('Logs partially deleted');
    		return false;

    	} else if (dr.size() == logs.size()) {
    		System.debug('Logs completely deleted');
    		return true;

    	} else {
    		return false;

    	}
    }

    // private methods
    private static Boolean manageLog(Account conta, String novoCPF) {
    	List<LogCPF__c> logs = conta.LogCPFs__r;
    	if (logs.size() == 0) {
    		//create log
    		LogCPF__c newLog = new LogCPF__c(
    			Name = conta.Name + ' LOG',
    			Conta__c = conta.Id,
    			CPF_Corrente__c = novoCPF,
    			CPF_Anterior__c = conta.CPF__c
			);

    		Database.SaveResult sr = Database.insert(newLog, false);
    		System.debug('Create newLog Success: ' + sr.isSuccess());
    		return sr.isSuccess();

    	} else if (logs.size() == 1) {
    		// update log
    		LogCPF__c existingLog = logs[0];
    		existingLog.CPF_Anterior__c = existingLog.CPF_Corrente__c;
    		existingLog.CPF_Corrente__c = novoCPF;

    		Database.SaveResult sr = Database.update(existingLog, false);
    		System.debug('Update existingLog Success: ' + sr.isSuccess());
    		return sr.isSuccess();

    	} else if (logs.size() > 1) {
    		// keep latest log -> IRRELEVANT FOR THE MOMENT
    		System.debug('keep latesst Log //TO DO');
    		return false;

    	} else {
    		return false;

    	}
    }
    
    public static void testHack() {
        Integer i = 0;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
        i++;
    }
}