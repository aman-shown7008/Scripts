var elementId = arguments[0];
var elem=document.getElementById(elementId)


if(elem.getAttribute("data-automation-id") !== null) {
    if(elem.getAttribute("data-automation-id").toLowerCase() === "orgchartitem") {
        return elem.firstChild.firstChild.getAttribute("alt");
    }
}

if((elem.getAttribute('alt')!=null) && (elem.getAttribute('alt')!="")) {
    return elem.getAttribute('alt');
} else {
    if((elem.closest('li').querySelector('div[data-automation-id="menuItem"]')) !== null)
        return elem.closest('li').querySelector('div[data-automation-id="menuItem"]').getAttribute('aria-label')
    else 
        return ""
}