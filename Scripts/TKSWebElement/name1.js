var elementId = arguments[0];
var elem = document.getElementById(elementId);
var rtnValue="Empty";

if( elem.textContent.length > 0) {
    rtnValue = elem.textContent;
}

return rtnValue;