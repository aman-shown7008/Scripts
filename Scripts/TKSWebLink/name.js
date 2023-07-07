var elementId = arguments[0];
var elem=document.getElementById(elementId);

let retValue = null;
if(elem.hasAttribute('aria-label')) {
    retValue = elem.getAttribute('aria-label');
} else {
    retValue = elem.innerText;
}
return retValue;