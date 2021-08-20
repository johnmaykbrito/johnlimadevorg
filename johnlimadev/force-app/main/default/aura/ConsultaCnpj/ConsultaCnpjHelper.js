({
  findByNumber: function(component, cnpj) {
    var action = component.get("c.consultarSefazNumero");

    action.setParams({
      cnpj: cnpj
    });

    component.set("v.loading", true);

    // Add callback behavior for when response is received
    action.setCallback(this, function(response) {
      component.set("v.loading", false);

      var state = response.getState();

      if (state === "SUCCESS") {
        var result = JSON.parse(response.getReturnValue());

        if (result.status == "ERROR") {
          var toastEvent = $A.get("e.force:showToast");
          toastEvent.setParams({
            title: "Falha1!",
            type: "error",
            message: result.message
          });
          toastEvent.fire();

        } else {
          var empresas = [];
          empresas.push(result);
          var evento = $A.get("e.c:ConsultaCnpjResultadoEvent");
          evento.setParams({
            "strCompanyInfo": empresas
          });
          evento.fire();
        }
      } else {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Falha2!",
          type: "error",
          message: state
        });
        toastEvent.fire();
      }
    });
    // Send action off to be executed
    $A.enqueueAction(action);
  },
  findByName: function(component, name) {
    var action = component.get("c.consultarPorNome");

    action.setParams({
      nome: name
    });

    component.set("v.loading", true);

    // Add callback behavior for when response is received
    action.setCallback(this, function(response) {
      component.set("v.loading", false);

      var state = response.getState();

      if (state === "SUCCESS") {
        var result = JSON.parse(response.getReturnValue());

        console.log(result);

        if (result.status == "ERROR") {
          var toastEvent = $A.get("e.force:showToast");
          toastEvent.setParams({
            title: "Falha3!",
            type: "error",
            message: result.message
          });
          toastEvent.fire();
        } else {
          var empresas = [];

          for (var item in result.items) {
            empresas.push(result.items[item]);
          }

          // var evento = $A.get("e.c:ConsultaCnpjResultadoEvent");
          var sObject = component.get("v.sObject");

          evento.setParams({
            empresas: empresas,
            sObject: sObject,
            tipo: "nome"
          });
          evento.fire();
        }
      } else {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Falha4!",
          type: "error",
          message: state
        });
        toastEvent.fire();
      }
    });
    // Send action off to be executed
    $A.enqueueAction(action);
  }
});