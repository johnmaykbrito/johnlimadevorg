({
	handleComponentEvent : function(component, event, helper) {
		console.log(event.getParam("boneco"));
		alert(event.getParam("boneco"));
		component.set("v.receive", event.getParam("boneco"));
	}
})