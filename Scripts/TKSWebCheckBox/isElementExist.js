 var elementId = arguments[0];
 var elem = document.getElementById(elementId);

 
 return IsTKSWebCheckBox();

function IsTKSWebCheckBox() {
    if (objExists(elem)) {
        try {            
            //Added for excluding the element inside the TKSWebTable 
            //let arrParentElms = jQuery(elem).parentsUntil("table");
            let arrParentElms = jQuery(elem).parents("table");
            if(arrParentElms.length === 1) {  // if the element is part of table
                return "false";
            } else {
                return "true";
            }
        } catch (e) {
            //keeping JS code in case JQuery fails
            if(!((elem.offsetParent)==null)) { 
                if(!(((elem.offsetParent.parentElement.offsetParent.tagName)==null)||((elem.offsetParent.tagName)==null))) {
                    if(((elem.offsetParent.parentElement.offsetParent).tagName=="TABLE")||(elem.offsetParent.tagName=="TABLE"))
                    {
                        return "false";
                    } 
                    else 
                    {   
                        return "true";
                    }
                }
            }
            return "false"
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
    // if (!isVisible(tmpObj)) {
    //     return false;
    // }
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