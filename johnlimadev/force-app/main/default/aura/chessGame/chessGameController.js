({
    onDragStart : function(component, event, helper) {
        helper.handleDragStart(component, event);
    }, 
    
    onDrop : function(component, event, helper) {
        helper.handleDrop(component, event);
    },
    
    allowDrop: function(cmp, event, helper){
        event.preventDefault();
    },
    
    // Sets an empApi error handler on component initialization
    onInit : function(component, event, helper) {
        const empApi = component.find('empApi');
        
        // Uncomment below line to enable debug logging (optional)
        // empApi.setDebugFlag(true);
        
        empApi.onError($A.getCallback(error => {
            // Error can be any type of error (subscribe, unsubscribe...)
            console.error('EMP API error: ', error);
        }));
            setTimeout(function() { 
            helper.subscribe(component, event, helper);
        }, 3000);             
    },  
    
    choosewhite : function(component, event, helper) {
        console.log('choosing white pieces...');
        helper.setPlayer(component, event, helper, 'white');
    },
            
    chooseblack : function(component, event, helper) {
        console.log('choosing black pieces...');
        helper.setPlayer(component, event, helper, 'black');
    },        
})