({
    goBack : function(component, event, helper) {
        
        console.log("OfferPreviewController.goBack: entered");

        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to go back to previous child LC:
        
        var cmpEvent = component.getEvent("bubblingEvent");
        console.log('cmpEvent: ' + cmpEvent);
        
        cmpEvent.setParams({"ComponentAction" : 'OfferPreview_Back' });

        cmpEvent.fire();
        
        
        //Pass the the latest Text and Subject values back to the last LC when going back:
        // var appEvent = $A.get("e.nhoj:CandidateDetailEvent");
        // appEvent.setParams({ 
        //                     "offerText": component.get("v.templateVal"),
        //                     "offerSubject": component.get("v.templateSubjectVal")
        //                    });
        
        // appEvent.fire();
        
        
        console.log("OfferPreviewController.goBack: exit");
    },
    
    goNext : function(component, event, helper) {
        
        console.log("OfferPreviewController.goNext: entered");

        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to go back to next child LC:
        
        var cmpEvent = component.getEvent("bubblingEvent");
        console.log('cmpEvent: ' + cmpEvent);
        
        cmpEvent.setParams({"ComponentAction" : 'OfferPreview_Next' });

        cmpEvent.fire();
        
        
        //Pass the the latest Text and Subject values to the next LC:
        // var appEvent = $A.get("e.nhoj:CandidateDetailEvent");
        // appEvent.setParams({ 
        //                     "offerText": component.get("v.templateVal"),
        //                     "offerSubject": component.get("v.templateSubjectVal"),
		// 		            "offerId": component.get("v.offerId"),
		// 		            "email": component.get("v.email"),
        //     				"LCWhoFired": 'OfferPreview.cmp'
        //                    });
        
        // appEvent.fire();
        
        
        console.log("OfferPreviewController.goNext: exit");
    }
})