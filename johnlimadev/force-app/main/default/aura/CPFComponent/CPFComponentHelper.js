({
	showToast : function(component, event, type, title, message) {
	    var toastEvent = $A.get("e.force:showToast");
	    toastEvent.setParams({
	        "type": type,
	        "title": title,
	        "message": message
	    });
	    toastEvent.fire();
	}
})