var elementId = arguments[0];
var elem = document.getElementById(elementId);
return IsTKSWebRadioGroup();

function IsTKSWebRadioGroup() {

    if (objExists(elem)) {

        if (!((elem.offsetParent) == null)) {

            if (!(((elem.offsetParent.parentElement.offsetParent.tagName) == null) || ((elem.offsetParent.tagName) == null))) {
                if (((elem.offsetParent.parentElement.offsetParent).tagName == "TABLE") || (elem.offsetParent.tagName == "TABLE")) {
                    return "false";
                } else if ((elem.querySelector('img[data-automation-id="list_detail_listToggle"]') != null) && (elem.querySelector('img[data-automation-id="list_detail_gridToggle"]') != null)) {
                    return "false";
                } else if ((elem.hasAttribute("data-automation-id") === true) && (elem.getAttribute('data-automation-id').toLowerCase() === 'multiviewcontainertoolbartogglebuttons')) {
                    // tks-9315 - handling of toolbar button case identified durign CAT.
                    return "false";
                } else {
                    return "true";

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
    } else {
        return true;
    }

}