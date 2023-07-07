var elementId = arguments[0];
var elem=document.getElementById(elementId);
let retValue = "Empty";
if(elem.hasChildNodes) {
    for (let index = 0; index < elem.children.length; index++) {
        let chldElm = elem.children[index];
        let isTabSelected = JSON.parse(chldElm.getAttribute('aria-selected'));
        if(isTabSelected === true) {
            retValue=chldElm.textContent;
            break;
        }        
    }
}
return retValue;