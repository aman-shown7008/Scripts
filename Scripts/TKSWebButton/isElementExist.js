var elementId = arguments[0];
var elem = document.getElementById(elementId);

return IsTKSWebButton();

function IsTKSWebButton() {
    var retValue = false;
    if(elem.getAttribute('title')=='Attach'){
        return "false"
    }else if (objExists(elem)) {
        //Added for excluding the element inside the TKSWebTable
        if(elem.offsetParent !== null) { // adding this condition to handle null cases of offsetParent.
            if(elem.offsetParent.parentElement !== null) { // adding this condition to handle null cases of offsetParent.
                if(elem.offsetParent.parentElement.offsetParent !== null) { // adding this condition to handle null cases of offsetParent.
                    if(elem.parentElement.offsetParent !== null) {
                        if(!(((elem.offsetParent.parentElement.offsetParent)==null)||((elem.offsetParent.tagName)==null))) {
                            if(((elem.offsetParent.parentElement.offsetParent).tagName=="TABLE")||(elem.offsetParent.tagName=="TABLE"))
                            {
                                return "false";
                            }
                            else if((elem.parentElement.offsetParent.offsetParent) !== null)
                            {
                                if((elem.parentElement.offsetParent.offsetParent).tagName == "TABLE"){
                                    return "false";
                                }

                                //added for tks-8443
                                // commenting it to solve POC issue.
                                // if(jQuery(elem).closest("div[data-automation-id='responsiveMonikerInput']").length > 0) {
                                //     return "false";
                                // }

                                return "true";

                            }else 
                            {
                                retValue = true;
                                if(elem.hasAttribute("data-automation-id")) {
                                    var _datAutId = elem.getAttribute("data-automation-id");
                                    if(_datAutId.toLowerCase() === "workerprofilemorelinkmenuitem") {
                                        retValue = false;
                                    }
                                }                                
                              
                                if(retValue) {
                                    return "true";
                                } else {
                                    return "false";
                                }
                            }		
                        }
                    }
                }
            }
       }
    } else {
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
    // I have enabled this to avoid offset null error. I believe this is commented out since it was handled somewhere else.  But umcommenting here solves offset null error.
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