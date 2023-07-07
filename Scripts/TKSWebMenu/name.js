var elementId = arguments[0];
var elem=document.getElementById(elementId);
if(elem.getAttribute('class')=='gwt-Label WBUC')
return;
var value=elem.parentElement.parentElement.parentElement;
return value.previousSibling.lastElementChild.innerText;