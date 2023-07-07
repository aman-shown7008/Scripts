var elementId = arguments[0];
var elem=document.getElementById(elementId);

if(elem.hasAttribute('data-automation-id')){
    let value = elem.getAttribute('data-automation-id');
    return "smartxpath|//*[@data-automation-id='"+value+"']"

}else if(elem.hasAttribute('role')){
    let value = elem.getAttribute('role');
    return "smartxpath|//*[@role='"+value+"']"
}else{
    return 'disabled'
}


