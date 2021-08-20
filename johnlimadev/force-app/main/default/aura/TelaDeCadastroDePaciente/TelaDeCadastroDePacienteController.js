({
    myAction : function(component, event, helper) {
        
    },
    
    handleclickongroupbuttons : function(component, event, helper) {
        var selectedButtonLabel = event.getSource().get("v.label");
        var pageNumber = component.get("v.pageNumber");
        var currentStep = component.get("v.currentStep");
        
        switch(selectedButtonLabel) {
            case 'Voltar':
                
                pageNumber--;
                component.set("v.pageNumber", pageNumber);
                
                var paginacaoEvent = $A.get("e.c:notificarMudancaDePagina");
                paginacaoEvent.setParams({pageNumber: pageNumber});
                paginacaoEvent.fire();
                
                break;
            case 'Seguir':
                pageNumber++;
                component.set("v.pageNumber", pageNumber);
                
                var paginacaoEvent = $A.get("e.c:notificarMudancaDePagina");
                paginacaoEvent.setParams({pageNumber: pageNumber});
                paginacaoEvent.fire();
                
                break;
            case 'Salvar':
                alert("Salvou");
                break;
            default:
                // code block
        }
        component.set("v.currentStep", String(pageNumber));
    },
    
    handleSelect: function (cmp, event, helper) {
        // This will contain the string of the "value" attribute of the selected
        // lightning:menuItem
        var selectedMenuItemValue = event.getParam("value");
        alert("Menu item selected with value: " + selectedMenuItemValue);
        
        switch(selectedMenuItemValue) {
            case 'Cancelar':
                alert("Cancelou");
                break;
            default:
                // code block
        }
    }
})