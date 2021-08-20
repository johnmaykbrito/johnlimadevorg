({
  handleComponentEvent: function(component, event, helper) {
    component.set("v.empresas", event.getParam('strCompanyInfo'));

    // var result = JSON.parse(event.getParam('strCompanyInfo'));
    // component.set("v.items", result.atividade_principal);
    // console.log(result.atividade_principal);
  },
  act: function(component, event, helper) {
    alert('act');
  }
});