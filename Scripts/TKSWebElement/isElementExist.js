var elementId = arguments[0];
var elem = document.getElementById(elementId);
return IsTKSCustomLabel();

function IsTKSCustomLabel() {
    
    if (objExists(elem)) {
            
        if(!((elem.offsetParent)==null)) { 

            if(elem.offsetParent.parentElement.offsetParent !== null) { // Added for TKS-8380

                if(!(((elem.offsetParent.parentElement.offsetParent.tagName)==null)||((elem.offsetParent.tagName)==null))) {
                    
                    if(((elem.offsetParent.parentElement.offsetParent).tagName=="TABLE")||(elem.offsetParent.tagName=="TABLE"))
                    {
                        return "false";
                    } 
                    else 
                    {   
                        let result = false;
                        if(elem.tagName.toLowerCase() === "label") {   
                            if(elementId === null) return "false";                 
                            let datAutIDElmId = elementId.slice(0,-10);
                            let datAutIDElm = document.getElementById(datAutIDElmId);
                            let datAutAttrValue = "";
                            if(datAutIDElm !== null) {
                                if(datAutIDElm.hasAttribute("data-automation-id")) {
                                    datAutAttrValue = datAutIDElm.getAttribute("data-automation-id");
                                    switch (elem.tagName.toLowerCase()) {
                                        case "label":
                                            switch (datAutAttrValue.toLowerCase()) {
                                                case "textview":
                                                case "numerictext":
                                                case "multilinetextview":                                        
                                                    result = true;
                                                    break;
                                                case "textinput":
                                                    // To handle particular case in "Add Beneficiary" page for webelement (legal name, Gender, DOB, etc)
                                                    // Actions menu from view profile page of an employee  Benefits->View Beneficiaries option
                                                    let tmpChilElm = datAutIDElm.firstElementChild;
                                                    if(tmpChilElm !== null) {
                                                        if(tmpChilElm.hasAttribute("data-automation-id")) {
                                                            if(tmpChilElm.getAttribute("data-automation-id").toLowerCase() === "textview") {
                                                                result = true;
                                                            }
                                                        }
                                                    }
                                                    break;
                                                case "responsivemonikerinput":
                                                        let _elms = datAutIDElm.getElementsByTagName("span");
                                                        result = true;
                                                        for (let index = 0; index < _elms.length; index++) {
                                                            let _elm = _elms[index];
                                                            if(_elm.hasAttribute("data-automation-id")) {
                                                                if(_elm.getAttribute("data-automation-id").toLowerCase() === "prompticon" || _elm.getAttribute("data-automation-id").toLowerCase() === "promptsearchbutton") {
                                                                    result = false;
                                                                    break;
                                                                } 
                                                            }
                                                        }     
                                                    break;
                                                }
                                        break;
                                    }
                                } else if(jQuery("#" + datAutIDElmId.replace('$','\\$') +" span:nth-child(2)").find('div[data-automation-id="textView"]')[0] !== undefined || 
                                jQuery("#" + datAutIDElmId.replace('$','\\$') +" span:nth-child(1)").find('div[data-automation-id="textView"]')[0] !== undefined ||
                                jQuery("#" + datAutIDElmId.replace('$','\\$') +" div span:nth-child(2)").find('div[data-automation-id="responsiveMonikerInput"]')[0] !== undefined ||
                                jQuery("#" + datAutIDElmId.replace('$','\\$') +" div span:nth-child(1)").find('div[data-automation-id="responsiveMonikerInput"]')[0] !== undefined
                                ) {
                                    // to handle a case in tks-8019
                                    // edit notice period case of an employee
                                    // tks-9315 Added replace stmt in the above condition to resolve the issue faced durign cat execution in "Schedule Course Offering" page
                                    result = true;
                                }
                            }                        
                        } else if (elem.tagName.toLowerCase() === "div") {
                            if(elem.hasAttribute("data-automation-id")) {
                                if(elem.getAttribute("data-automation-id").toLowerCase()  === "profileheaderitemtitle") {
                                    result = true;
                                }
                            }                        
                        } 
                        if(result) {
                            return "true";                        
                        } else {
                            return "false";                        
                        }                        
                    }
                }
            }
        }
	}
	else {
        return "false";
    }
}


function objExists(tmpObj) {
    if (typeof (tmpObj) == 'undefined' || tmpObj == null) {
        return false;
    }
    if (typeof (tmpObj) != "object") {
        return false;
    }
    if (!isVisible(tmpObj)) {
         return false;
     }
    return true;
}


function isVisible(obj) {
    if (obj == document) return true;
    if (!obj) return false;
    if (obj.hasOwnProperty("style")) {
        var style = obj.currentStyle;
        if (style) {
            if (style.display == 'none') return false;
            if (style.visibility == 'hidden') return false;
        }
    }else{
        return true;
    }

}