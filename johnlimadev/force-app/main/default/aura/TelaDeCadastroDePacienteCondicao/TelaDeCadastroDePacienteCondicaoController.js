({
	handleApplicationEvent : function(component, event, helper) {
		var thisPage = event.getParam('pageNumber');
        if (thisPage == 2) {
            //alert('A página é '+ thisPage);
        }
	},
    
    handleDataTransfer : function(component, event, helper) {
		console.log('Entrou em handleDataTransfer');
        var prinome = event.getParam('primeiroNome');
        var ultnome = event.getParam('ultimoNome');
        // alert('Na pg 2: ' + prinome + ' ' + ultnome);
	}
})