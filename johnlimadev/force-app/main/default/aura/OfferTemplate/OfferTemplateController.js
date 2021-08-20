({
    goBack : function(component, event, helper) {
        
        console.log("OfferTemplateController.goBack: entered");

        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to go back to previous child LC:
        
        var cmpEvent = component.getEvent("bubblingEvent");
        console.log('cmpEvent: ' + cmpEvent);
        
        cmpEvent.setParams({"ComponentAction" : 'OfferTemplate_Back' });

        cmpEvent.fire();
        
        
        console.log("OfferTemplateController.goBack: exit");
    },
    
    goNext : function(component, event, helper) {
        
        console.log("OfferTemplateController.goNext: entered");
        
        // Grab changes made by User on the Editor and store it on the LC attribute

        // var changedText = component.find("txtArea").get("v.value");
        // console.log('changedText: ' + changedText);
        // component.set("v.templateVal", changedText);
        
        // var changedSubject = component.find("txtSubject").get("v.value");
        // console.log('changedSubject: ' + changedSubject);
        // component.set("v.templateSubjectVal", changedSubject);
        
        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to go to the next child LC:
        
        var cmpEvent = component.getEvent("bubblingEvent");
        console.log('cmpEvent: ' + cmpEvent);
        
        cmpEvent.setParams({"ComponentAction" : 'OfferTemplate_Next' });

        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to hide this child LC and unhide the next child LC:
        cmpEvent.fire();
        
        //Pass the values grabbed from this LC Form + Candidate ID to the next child LC via Lightning Events:
        // var appEvent = $A.get("e.nhoj:CandidateDetailEvent");
        // appEvent.setParams({ "candidateID" : component.get("v.recordId"),
        //                     "enteredSalary" : component.get("v.enteredSalary"),
        //                     "enteredBonus" : component.get("v.enteredBonus"),
        //                     "selectedTemplateId" : component.get("v.selectedTemplateId"),
        //                     "offerId": component.get("v.offerId"),
        //                     "offerText": component.get("v.templateVal"),
        //                     "offerSubject": component.get("v.templateSubjectVal"),
        //                     "email": component.get("v.email"),
        //                     "LCWhoFired": 'OfferTemplate.cmp'
        //                    });
        
        // appEvent.fire();
        
        
        
        
        console.log("OfferTemplateController.goNext: exit");
    }
    
})