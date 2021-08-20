({
    globalResponse : null,
    isSearchByNumber : false,
    
    updateRecordInfo : function (cmp, event, helper) {
        console.log('Inside updateRecordInfo...:');
        console.log(this.globalResponse);
        
        let i = cmp.find('companyId').get('v.value');
        i--;
        console.log('Index of the selected item:');
        console.log(i);
        
        let company;
        if (this.isSearchByNumber) {
            console.log('this.isSearchByNumber: ' + this.isSearchByNumber);
            company = this.globalResponse;
            
        } else if (!this.isSearchByNumber) {
            console.log('this.isSearchByNumber: ' + this.isSearchByNumber);
            company = this.globalResponse[i];
        }
        
        var action = cmp.get("c.updateCompanyinfoCTRL");
        action.setParams({
            company : JSON.stringify(company),
            recordId: cmp.get("v.recordId"),
            isSearchByNumber : this.isSearchByNumber
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {           
                console.log(JSON.parse(response.getReturnValue()));
                
                cmp.set('v.usingInfo', true);
                
                let i = 1;
                var myVar = setInterval(myTimer, 1000);
                function myTimer() {
                    i += 1;
                    cmp.find("progress").set("v.currentStep", i.toString());
                    if (i == 3) {
                        myStopFunction();
                        setTimeout(function() {
                            turnSpinnerOnAndRefresh();
                        }, 1000);
                        
                    }
                }
                function myStopFunction() {
                    clearInterval(myVar);
                }
                function turnSpinnerOnAndRefresh() {
                    cmp.set('v.loading', true);
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                }
                
                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    searchByName: function (cmp, event, helper, acctName) {
        console.log('Inside search by name...');
        
        var action = cmp.get("c.searchByNameCTRL");
        action.setParams({ name : acctName });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let jsonResp = JSON.parse(response.getReturnValue());
                this.globalResponse = jsonResp;
                
                console.log('globalResponse:');
                console.log(this.globalResponse);
                
                //##############
                //##############
                //handle when array returns with 0 elements
                //##############
                //##############
                
                let options = '['
                for (let i = 0; i < jsonResp.length; i++) {
                    if (i == 0 && jsonResp.length > 1) {
                        options += '{"id":"' + (i+1) + '",' + '"label":"' + jsonResp[i].city + ' - ' + jsonResp[i].fantasia + ' - '+ jsonResp[i].number_Z + '","selected":"true"},';
                    } else if (i == 0 && jsonResp.length == 1) {
                        options += '{"id":"' + (i+1) + '",' + '"label":"' + jsonResp[i].city + ' - ' + jsonResp[i].fantasia + ' - '+ jsonResp[i].number_Z + '","selected":"true"}';
                    } else if (i == jsonResp.length-1) {
                        options += '{"id":"' + (i+1) + '",' + '"label":"' + jsonResp[i].city + ' - ' + jsonResp[i].fantasia + ' - '+ jsonResp[i].number_Z + '"}';
                    } else {
                        options += '{"id":"' + (i+1) + '",' + '"label":"' + jsonResp[i].city + ' - ' + jsonResp[i].fantasia + ' - '+ jsonResp[i].number_Z + '"},';
                    }
                }
                options += ']';
                
                console.log('options:');
                console.log(options);
                
                var selectJSON = {
                    selectedSchoolId: 1,
                    schools: JSON.parse(options)
                };
                
                cmp.set('v.options', selectJSON.schools);
                cmp.set('v.selectedValue', selectJSON.selectedSchoolId);
                
                cmp.set('v.loading', false);
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    $A.get("e.force:closeQuickAction").fire();
                    helper.showToastError(cmp, event, helper);
                    
                    
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    searchByNumber: function (cmp, event, helper, CNPJ) {
        this.isSearchByNumber = true;
        
        console.log('Inside searchByNumber...');
        
        var action = cmp.get("c.searchByNumberCTRL");
        action.setParams({ cnpj : CNPJ });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                let jsonResp = JSON.parse(response.getReturnValue());
                this.globalResponse = jsonResp;
                
                console.log('this.globalResponse...');
                console.log(this.globalResponse);
                
                var selectJSON = {
                    selectedSchoolId: 1,
                    schools: JSON.parse('[{"id": "1", "label": "' + this.globalResponse.municipio + ' - ' + this.globalResponse.fantasia + ' - ' + this.globalResponse.cnpj + '", "selected":"true"}]')
                };
                
                console.log('selectJSON');
                console.log(selectJSON);
                
                cmp.set('v.options', selectJSON.schools);
                cmp.set('v.selectedValue', selectJSON.selectedSchoolId);
                
                
                cmp.set('v.loading', false);
                
                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    $A.get("e.force:closeQuickAction").fire();
                    helper.showToastError(cmp, event, helper);
                    
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    showToastError : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "error",
            "title": "Algo deu errado!",
            "message": "Pesquisa mal sucedida. Tente novamente."
        });
        toastEvent.fire();
    }
})