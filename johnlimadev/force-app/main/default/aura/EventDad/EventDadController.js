({
	handleComponentEvent : function(component, event, helper) {
        alert('Dad: Evento percebido');
        var accRec = event.getParam("AccName");
        alert('Dad: Parâmetro recebido no evento: ' + accRec);
	}
})