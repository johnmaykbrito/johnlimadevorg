({
    init: function(cmp, event, helper) {
        var CNPJ;
        var acctName;
        
        setTimeout(function(){ 
            CNPJ = cmp.get("v.CNPJ");
            acctName = cmp.get("v.AcctName");
            
            console.log('1: ' + CNPJ);
            console.log('2: ' + acctName);
            
            if (CNPJ == null) {
                console.log('Searching by name...');
                helper.searchByName(cmp, event, helper, acctName);
            } else if (CNPJ != null) {
                console.log('Searching by number...');
                helper.searchByNumber(cmp, event, helper, CNPJ);
            }
        }, 1000);
        
    },
    
    handleClick : function (cmp, event, helper) {
        console.log('Handling Click....');
        cmp.set("v.usingInfo", true);
        helper.updateRecordInfo(cmp, event, helper);
    }
})