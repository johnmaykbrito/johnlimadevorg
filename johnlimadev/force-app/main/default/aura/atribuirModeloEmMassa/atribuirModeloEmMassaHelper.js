({
    search : function(component, event, helper) {
        // console.log(event.getSource());
        let isEnterKey = event.keyCode === 13;
        let queryTerm;
        if (isEnterKey || event.getSource != null) {
            queryTerm = component.find('enter-search').get('v.value');
            // alert('Searched for "' + queryTerm + '"...');
        } else {
            return;
        }

        let action = component.get("c.consultaContaLightning");
        action.setParams({
            "filtro": queryTerm
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // console.log(response.getReturnValue());
                // if(response.getReturnValue() != null){
                let contasEscolhidas = component.get('v.contasEscolhidas');
                let returnValue = response.getReturnValue();
                if (contasEscolhidas != null && contasEscolhidas.length > 0) {
                    console.log('entrou');
                    console.log(contasEscolhidas);
                    console.log(contasEscolhidas.length);
                    for (var i = 0; i < contasEscolhidas.length; i++) {
                        for (var j = 0; j < returnValue.length; j++) {
                            if (contasEscolhidas[i].Id == returnValue[j].Id)
                                returnValue.splice(j, 1);
                            else
                                continue;
                        }
                    }
                }
                component.set("v.contasPesquisadas", returnValue);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });        
        $A.enqueueAction(action);
    }
})