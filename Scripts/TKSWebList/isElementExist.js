 var elementId = arguments[0];
 var elem = document.getElementById(elementId);

 return IsTKSWebList();

function IsTKSWebList() {
    let attribute = elem.getAttribute('id');
    let id = attribute + "-formLabel";
    if (objExists(elem) && elem.offsetParent!= null) {
        if(!(((elem.offsetParent.parentElement.offsetParent)==null)||((elem.offsetParent.tagName)==null))) { 
            //Added for excluding the element inside the TKSWebTable 
            if((elem.offsetParent.parentElement.offsetParent.tagName)=="TABLE"||(elem.offsetParent.tagName)=="TABLE" || elem.parentElement.offsetParent.offsetParent.tagName =="TABLE")
            {
                return "false";
            } else {
                let result = false;
                // Allowed for the elements(weblist) which is clickable
                if(elem.getAttribute("data-automation-id").toLowerCase() === "responsivemonikerinput") {

                    if(elem.parentElement.parentElement.hasAttribute("data-automation-id")) {
                        if(elem.parentElement.parentElement.getAttribute("data-automation-id").toLowerCase() === "radiogroupchildwidget") {
                            // for combined radiogroup operation
                            return "false";
                        }                        
                    }

                    let _elms = elem.getElementsByTagName("span");
                    for (let index = 0; index < _elms.length; index++) {
                        let _elm = _elms[index];
                        if(_elm.hasAttribute("data-automation-id")) {
                            if(_elm.getAttribute("data-automation-id").toLowerCase() === "prompticon" || _elm.getAttribute("data-automation-id").toLowerCase() === "promptsearchbutton") {
                                result = true;
                                break;
                            } 
                        }
                    }
                } else if (elem.getAttribute("data-automation-id").toLowerCase() === "selectwidget") {
                    // allowed all comboboxes
                    result = true;
                    } 
                    else if (elem.getAttribute("data-automation-id").toLowerCase() === "selecteditem") {
                    // allowed all comboboxes
                    result = true;
                    } 
					else if (elem.getAttribute("data-automation-id").toLowerCase() === "selecteditemlist") {
                    // allowed all comboboxes
                    result = true;
                    }
                else if (elem.getAttribute("data-automation-id").toLowerCase() === "countrydropdown") {
                    // allowed all comboboxes
                    result = true;
                }
                     else if (elem.getAttribute("data-automation-id").toLowerCase() === "sourcedropdown") {
                    // allowed all comboboxes
                    result = true;
                
             } else if (elem.getAttribute("data-automation-id").toLowerCase() === "addresssection_countryregion") {
                    // allowed all comboboxes
                    result = true;
                }
        else if (elem.getAttribute("data-automation-id").toLowerCase() === "phone-device-type") {
                    // allowed all comboboxes
                    result = true;
                }
        //
        //
                 else if (elem.getAttribute('data-automation-id').toLowerCase() === "monikerlistsuggestionsinput") {
					result = true;
				} else if (elem.getAttribute('data-automation-id').toLowerCase() === "multiselectcontainer") {
					if(elem.hasAttribute ('data-automation-id-prompt')) {
                        if(elem.getAttribute('data-automation-id-prompt').toLowerCase() === "sourceprompt") {
                            result = true;
                        }
                    }
                }
                else if (elem.getAttribute('data-automation-id').toLowerCase() === "sourcedropdown" || elem.getAttribute('data-automation-id').toLowerCase() === "countrydropdown" || elem.getAttribute('data-automation-id').toLowerCase() === "phone-device-type" || elem.getAttribute('data-automation-id').toLowerCase() === "degree" || elem.getAttribute('data-automation-id').toLowerCase() === "menuitem" || elem.getAttribute('data-automation-id').toLowerCase() === "language" || elem.getAttribute('data-automation-id').toLowerCase() === "languageproficiency-0" || elem.getAttribute('data-automation-id').toLowerCase() === "languageproficiency-1" || elem.getAttribute('data-automation-id').toLowerCase() === "languageproficiency-2" || elem.getAttribute('data-automation-id').toLowerCase() === "623f971149831018c1cd91ad45e80000" || elem.getAttribute('data-automation-id').toLowerCase() === "623f971149831018c1cd91ad45e80003" || elem.getAttribute('data-automation-id').toLowerCase() === "623f971149831018c1cd9246ecf30002" || elem.getAttribute('data-automation-id').toLowerCase() === "veteranstatus" || elem.getAttribute('data-automation-id').toLowerCase() === "multiselectinputcontainer" || elem.getAttribute('data-automation-id').toLowerCase() === "dateinputwrapper") {//Update
					result = true;
				}        
                    
                
                if(result) {
                    return "true";
                } else {
                    return "false";
                }
            }
        }
		else {
            return "false";
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
