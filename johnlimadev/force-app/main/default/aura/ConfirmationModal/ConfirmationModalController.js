({    
    handleSave : function(component, event, helper) {
        var CaseRecord = component.get('v.CaseRecord');
        CaseRecord.Status = 'Working';
        component.set('v.CaseRecord', CaseRecord);        
        
        var AlunoRecord = component.get('v.AlunoRecord');
        console.log('%c '+AlunoRecord.nhoj__Somedate__c, 'color: white; background: orange;');
        AlunoRecord.Name = 'John';
        AlunoRecord.nhoj__Somedate__c = null;
        component.set('v.AlunoRecord', AlunoRecord);
        
        
        component.find("recordDataCase").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                helper.updateAlunoRecord(component, event, helper);
                helper.showToast(component, event, helper);
                $A.get("e.force:closeQuickAction").fire();
                $A.get("e.force:refreshView").fire();
            } else if (saveResult.state === "INCOMPLETE") {
                alert("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                alert('Problem saving record, error: ' +
                      JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
        
        
    },
    
    handleExit : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire(); 
    },
    
    onRender : function(component, event, helper) {
        if (component.get('v.AlunoId') == null) {
            var CaseRecord = component.get('v.CaseRecord');
            var AlunoId = component.get('v.AlunoId');
            AlunoId = CaseRecord.nhoj__Aluno__c;
            console.log('%c '+AlunoId, 'color: white; background: orange;');
            component.set('v.AlunoId', AlunoId);        
            component.find('recordDataAluno').reloadRecord(true);
        }
        
        if (component.get('v.AlunoRecord') != null && component.get('v.AlunoRecord') != false) {
            component.set('v.disableConfirmBtn', false);
        }  
    },

    closeQA : function (component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    }
})