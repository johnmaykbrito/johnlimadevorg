({
    fireComponentEvent : function(component, event, helper) {
        alert('Son: Prestes a pegar o evento');
        var cmpEvent = component.getEvent("cmpAccEvent");
        alert('Son: Evento capturado');
        cmpEvent.setParams({"AccName": "Josias"});
        alert('Son: Parâmetro setado');
        alert('Son: Before fire');
        cmpEvent.fire();
        alert('Son: After fire');
        alert('Son: END');
	},
    appExample : function(component, event, helper) {
        var bonecoJosias = "Boneco Josias";
        var EventAppExample = $A.get("e.c:EventAppExample"); 
        EventAppExample.setParams({"boneco": bonecoJosias}); 
        alert('Before fire: '+ bonecoJosias);
        EventAppExample.fire();
        alert('After fire: '+ bonecoJosias);
    }
})