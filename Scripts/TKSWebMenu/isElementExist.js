 var elementId = arguments[0];
 var elem = document.getElementById(elementId);

 return IsTKSWebMenu();

function IsTKSWebMenu() {
    if (objExists(elem)) {
        return "true";
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