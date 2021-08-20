({
	handleApplicationEvent : function(component, event, helper) {
		var pageNumber = event.getParam('pageNumber');
        if (pageNumber == 3) {
            alert('A págiga é a 3');
        }
	}
})