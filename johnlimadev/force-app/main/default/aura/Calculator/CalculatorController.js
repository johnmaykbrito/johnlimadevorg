({
    handleClick : function (cmp, event, helper) {
        helper.updateScreenOnAction(cmp, event, helper, true);
    },
    
    handleKeyPress : function (cmp, event, helper) {
    	helper.updateScreenOnAction(cmp, event, helper, false);
    }
})