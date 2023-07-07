var elementId = arguments[0];
var elem = document.getElementById(elementId);
return IsTKSWebEdit(elem);

function IsTKSWebEdit(elem) {
    if (objExists(elem)) {
        if (!(((elem.offsetParent.parentElement.offsetParent) == null) || ((elem.offsetParent.tagName) == null))) {
            if (((elem.offsetParent.parentElement.offsetParent).tagName == "TABLE") || (elem.offsetParent.tagName == "TABLE") || elem.parentElement.offsetParent.offsetParent == "TABLE") {
                return "false";
            } else if ((elem.firstChild != null) && (elem.firstChild.hasAttribute('aria-hidden'))) {
                if (elem.firstChild.getAttribute('aria-hidden') == "true")
                    return "false"
            } else {
                return "true";
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
    } else if ((obj.firstElementChild) !== null) {
        if (obj.firstElementChild.getAttribute('aria-readonly') == 'true') {
            return false;
        } else {
            return true;
        }

    } else {
        return true;
    }

}