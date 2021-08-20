({
    handleApplicationEvent : function(component, event, helper) {
        var pageNumber = event.getParam('pageNumber');
        alert('pg: '+pageNumber);
        
        if (pageNumber == 1) {
            
            alert('Data transfer from page 2 to page 1.');
            
        } else if (pageNumber == 2) {
            // Set attributes
            alert('Data transfer from page 1 to page 2.');
            var primeiroNome = component.find('primeiroNome').get('v.value');
            component.set('v.primeiroNome', primeiroNome);
            var ultimoNome = component.find('ultimoNome').get('v.value');
            component.set('v.ultimoNome', ultimoNome);
            
            var transferirDadosEntrePaginas = $A.get("e.c:transferirDadosEntrePaginas");
            transferirDadosEntrePaginas.setParams({primeiroNome: primeiroNome, ultimoNome: ultimoNome});
            transferirDadosEntrePaginas.fire();
        }
    },
    
    handleSelectSex: function (cmp, event, helper) {
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