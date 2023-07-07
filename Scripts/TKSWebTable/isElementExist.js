 var elementId = arguments[0];
 var elem = document.getElementById(elementId);

 return IsTKSWebTable();

function IsTKSWebTable() {
    if (objExists(elem)) {
        let retValue = true;
        if(elem.offsetParent !== null) {
            if(elem.offsetParent.firstChild !== null) {
                if(elem.offsetParent.firstChild.getAttribute("aria-label") !== null || elem.offsetParent.firstChild.getAttribute("aria-label") !== "") {
                    if(elem.offsetParent.firstChild.getAttribute("aria-label") === "Earnings/Deductions History") {
                        // this is added to solve tks-8438
                        retValue = false;
                    }
                }
            }
        }        
        if(retValue) {
            return "true";
        } else {
            return "false";
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