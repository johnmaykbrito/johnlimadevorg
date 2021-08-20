({
	updateCPF : function(component, event, helper) {
		let atributoDoComponente          = component.get('v.conta');
		let jsonTXTDoAtributoDoComponente = JSON.stringify(atributoDoComponente);
		let JSONDoAtributoDoComponente    = JSON.parse(jsonTXTDoAtributoDoComponente);
		console.log(JSONDoAtributoDoComponente);
		
		// validation using RegEx -> IRRELEVANT FOR THE MOMENT
		// let res = JSONDoAtributoDoComponente['CPF__c'].match(/\d{3}.\d{3}.\d{3}-\d{2}/g);
		// if (res == null || res == undefined || res.length == 0) {
		// 	helper.showToast(component, event, 'warning', 'Aviso!', 'O CPF não segue o padrão oficial: 000.000.000-00');
		// 	return;
		// }

		let idDoObjetoCorrente = component.get('v.currentRecord.Id');
		console.log(idDoObjetoCorrente);

		// Passar código complexo para o helper
		let action = component.get("c.updateCPFServerSide");
        action.setParams({
            "recordId" : idDoObjetoCorrente,
            "novoCPF"  : JSONDoAtributoDoComponente['CPF__c']
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                console.log("SUCCESS");
                let jsonResponse = JSON.parse(response.getReturnValue());
                if (jsonResponse) {
                	helper.showToast(component, event, 'success', 'Sucesso!', 'O CPF da conta foi atualizado com sucesso.');
                	// clear the 2nd field
                	component.set('v.conta.CPF__c', '');

                	// set first field w/ new CPF
                	component.set('v.currentRecord.CPF__c', JSONDoAtributoDoComponente['CPF__c']);

                } else {
					helper.showToast(component, event, 'error', 'Falha!', 'Algum problema ocorreu. Entre em contato com a assistência.');
                }

            } 
            else {
                console.log(state);
            }
        });
        $A.enqueueAction(action);
	}, 

	deleteLogCPF : function(component, event, helper) {
		let idDoObjetoCorrente = component.get('v.currentRecord.Id');
		console.log(idDoObjetoCorrente);

		let action = component.get("c.deleteLogCPFServerSide");
        action.setParams({
            "recordId" : idDoObjetoCorrente,
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                console.log("SUCCESS");
                let jsonResponse = JSON.parse(response.getReturnValue());
                console.log('deleteLogCPF Server Response: ' + jsonResponse);
                if (jsonResponse) {
                	helper.showToast(component, event, 'success', 'Sucesso!', 'Log deletado com sucesso.');

                } else {
					helper.showToast(component, event, 'warning', 'Aviso!', 'Não há Log a ser deletado.');
                	helper.showLogToastDeletionWarning(component, event);
                }
            } 
            else {
                console.log(state);
            }
        });
        $A.enqueueAction(action);
	}
})