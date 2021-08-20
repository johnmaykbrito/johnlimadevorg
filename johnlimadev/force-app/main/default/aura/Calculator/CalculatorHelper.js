({
    updateScreenOnAction : function(cmp, event, helper, isClick) {
        if (isClick) {
            helper.handleClickOnCalc(cmp, event, helper);
        } else {
            helper.handleKeyPressOnCalc(cmp, event, helper);
        }
    },
    
    handleClickOnCalc : function(cmp, event, helper) {
        let screenValue = cmp.find("calc_screen").get("v.value");
        if (Number.isInteger(Number(event.getSource().get("v.value")))) {
            if (screenValue == 'undefined' || screenValue == null || screenValue == '') {
                cmp.find("calc_screen").set("v.value", event.getSource().get("v.value"));    
            } else {
                cmp.find("calc_screen").set("v.value", screenValue + event.getSource().get("v.value"));
            }
        } else if (event.getSource().get("v.value") == '+') {
            // is preceeded by a number?
            alert("+");
        }
    },
    
    handleKeyPressOnCalc : function(cmp, event, helper) {
        let screenValue = cmp.find("calc_screen").get("v.value");
        if (Number.isInteger(Number(event.key))) {
            if (screenValue == 'undefined' || screenValue == null || screenValue == '') {
                cmp.find("calc_screen").set("v.value", event.key);    
            } else {
                cmp.find("calc_screen").set("v.value", screenValue + event.key);
            }
            
        } else if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/' || event.key == 'Dead' || event.key == '(' || event.key == ')' || event.key == '.') {
            if (screenValue == 'undefined' || screenValue == null || screenValue == '') {
                if (event.key == 'Dead') {
                    cmp.find("calc_screen").set("v.value", "^");    
                } else {
                    cmp.find("calc_screen").set("v.value", event.key);
                }
                
            } else {
                if (event.key == 'Dead') {
                    cmp.find("calc_screen").set("v.value", screenValue + "^");
                } else {
                    cmp.find("calc_screen").set("v.value", screenValue + event.key);
                }
            }
            
        } else if (event.key == 'Backspace') {
            console.log(screenValue);
            screenValue = cmp.find("calc_screen").get("v.value");
			let newScreenValue = screenValue.substring(0, screenValue.length - 1);
            console.log(newScreenValue);
            cmp.find("calc_screen").set("v.value", newScreenValue);
        } else if (event.key == 'Enter') {
            cmp.find("calc_screen").set("v.value", eval(screenValue));
        } else {
            console.log(event.key);
        }
    }
})