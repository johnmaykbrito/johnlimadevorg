({
    doInit : function(component, event, helper) {

    },

    HandleNextClick : function(component, event, helper) {
        
        console.log("OfferDetailsController.CreateOffer: entered");

        
        // Fire Component (Bubbling) event to ask the OfferLetterSPA LC (Parent) to hide this child LC and unhide the Template child LC:
                
        var cmpEvent = component.getEvent("bubblingEvent");
        console.log('cmpEvent: ' + cmpEvent);
        
        cmpEvent.setParams({"ComponentAction" : 'OfferDetails_Next' });
        
        cmpEvent.fire(); 
        
        
        
        
        // // Get the values from the form
		// var n1 = component.find("salary").get("v.value");
        // console.log("Salary entered:" + n1);
        
		// var n2 = component.find("bonus").get("v.value");
        // console.log("Bonus entered:" + n2);
        
        // var t1 = component.find("templateSelect").get("v.value");
        // console.log("Template Id selected:" + t1);
        
        // // Store values on this LC Attributes:
      
     	// component.set("v.enteredSalary", n1);
        // component.set("v.enteredBonus", n2);
        // component.set("v.selectedTemplateId", t1);
        
        
        
        // helper.createOfferAndNavigate(component);
        
        
        
        
        console.log("OfferDetailsController.CreateOffer: exit");
    }
})