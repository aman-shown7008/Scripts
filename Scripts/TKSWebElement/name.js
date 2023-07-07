var elementId = arguments[0];
var elem = document.getElementById(elementId);
var rtnValue="Empty";
//var lastLabelElement="Empty";

if( elem.textContent.length > 0) {
     //lastLabelElement = elem.querySelector('.css-1uso8fp');
     //rtnValue = lastLabelElement.textContent.trim().replace('Turnkey Test 9 42170:', '');
    rtnValue = elem.textContent;
}

return rtnValue;