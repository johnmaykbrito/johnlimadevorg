({
    myAction : function(component, event, helper) {
        let showScreen = component.get('v.showScreen');
        showScreen++;
        if (showScreen > 2)
            showScreen = 0;
        component.set('v.showScreen', showScreen);
    },

    handleSearch: function (component, event, helper) {
        helper.search(component, event, helper);
    },
    addOrRemButton: function (component, event, helper) {
        let source = event.getSource();
        let btnLabel = source.get('v.label');
        let btnClass = source.get('v.class');
        let item = source.get('v.value'); //>>>>>>>>>>>

        if (btnLabel == 'Adicionar') {
            // Add em escolhidas
            let contasEscolhidas = component.get('v.contasEscolhidas');
            contasEscolhidas.push(item);
            component.set('v.contasEscolhidas', contasEscolhidas);

            // Remover de Pesquisadas
            let contasPesquisadas = component.get('v.contasPesquisadas');
            let index = contasPesquisadas.indexOf(item);
            // console.log(index);
            if (index > -1) {
                contasPesquisadas.splice(index, 1);
            }
            component.set('v.contasPesquisadas', contasPesquisadas);

            // then
            // source.set('v.class', 'Remover');
            // source.set('v.iconName', 'utility:undo');
            
        } else if (btnLabel == 'Remover') {
            // // Remove from list
            // let contasEscolhidas = component.get('v.contasEscolhidas');
            // console.log(item);
            // let index = contasEscolhidas.indexOf(item);
            // console.log(index);
            // if (index > -1) {
            //     contasEscolhidas.splice(index, 1);
            // }
            // component.set('v.contasEscolhidas', contasEscolhidas);
            // console.log(contasEscolhidas);
            // // then
            // event.getSource().set('v.label', 'Adicionar');
            // event.getSource().set('v.iconName', 'utility:add');


            // Add em Pesquisadas
            let contasPesquisadas = component.get('v.contasPesquisadas');
            contasPesquisadas.push(item);
            component.set('v.contasPesquisadas', contasPesquisadas);

            // Remover de Escolhidas
            let contasEscolhidas = component.get('v.contasEscolhidas');
            let index = contasEscolhidas.indexOf(item);
            // console.log(index);
            if (index > -1) {
                contasEscolhidas.splice(index, 1);
            }
            component.set('v.contasEscolhidas', contasEscolhidas);
        }
    }
})