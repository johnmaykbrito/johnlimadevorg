({
  buscarCnpj: function(component, event, helper) {
    var inputCmp = component.find("filtro");
    inputCmp.showHelpMessageIfInvalid();

    if (!inputCmp.get("v.validity").valid) {
      return;
    }

    inputCmp.set("v.validity", { valid: true, badInput: false });

    var filtro = component.get("v.filtro");

    if (component.get("v.opcaoSelecionada") == "nome") {
      if (filtro.length < 3) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Campo inválido!",
          type: "warning",
          message: "Informe no mínimo 3 letras para consultar empresas por nome"
        });
        toastEvent.fire();

        return;
      }
      helper.findByName(component, filtro);
    }

    if (component.get("v.opcaoSelecionada") == "numero") {
      var cnpj = filtro.replace(/[^\d]+/g, "");

      if (cnpj.length != 14) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Campo inválido!",
          type: "warning",
          message:
            "Cnpj inválido, digite 14 caracteres sem máscara ou um cnpj com mascara"
        });
        toastEvent.fire();
        return;
      }
      helper.findByNumber(component, cnpj);
    }
  },

  doInit: function(component, event, helper) {
    component.set("v.fields", ["Id", "Name", "CNPJ__c"]);

    var recordId = component.get("v.recordId");
    var recordCnpj = component.get("v.recordCnpj");

    component.set("v.dsRecordId", recordId);

    var service = component.find("service");
    service.reloadRecord();
  },
  opcaoChange: function(component, event, helper) {
    component.set("v.opcaoSelecionada", event.getSource().get("v.value"));
  },
  onRecordUpdated: function(component, event) {
    var sObject = component.get("v.sObject");

    if (sObject) {
      console.log(sObject["CNPJ__c"]);

      if (
        typeof sObject["CNPJ__c"] != "undefined" &&
        sObject["CNPJ__c"] != null &&
        sObject["CNPJ__c"] != ""
      ) {
        component.set("v.filtro", sObject["CNPJ__c"]);
        component.set("v.opcaoSelecionada", "numero");
      } else {
        component.set("v.filtro", sObject["Name"]);
        component.set("v.opcaoSelecionada", "nome");
      }
    }
  },
  onRender: function(component, event, helper) {
    /*
        console.log('onrender element ', component.find("filtro").getElement());
        
        if(component.get('v.opcaoSelecionada') == 'numero'){
            jQuery(component.find("filtro").getElement()).mask('99.999.999/9999-99');
        } else {
            jQuery(component.find("filtro").getElement()).unmask();
        }
        */
  },
  recordChangeHandler: function(component, event) {
    console.log("recordchange");
    var id = event.getParam("recordId");
    component.set("v.dsRecordId", id);
    var service = component.find("service");
    service.reloadRecord();
  }
});