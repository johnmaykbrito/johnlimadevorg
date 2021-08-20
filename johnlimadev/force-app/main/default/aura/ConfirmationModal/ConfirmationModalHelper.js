({
	showToast : function(component, event, helper) {
		var toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			"type": "success",
			"title": "Success!",
			"message": "The record has been updated successfully."
		});
		toastEvent.fire();
	},
    
    updateAlunoRecord : function(component, event, helper) {
        component.find("recordDataAluno").saveRecord($A.getCallback(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // Success
                    console.log('%c Saul Goodman', 'color: white; background: orange;');
                } else if (saveResult.state === "INCOMPLETE") {
                    alert("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    alert('Problem saving record, error: ' +
                               JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            }));
        
	}
})