var elementId = arguments[0];
var elem = document.getElementById(elementId);
let retValue = "Empty";
let innerText = "null";


let closestElement = elem.closest('[data-automation-id="formLabelRequired"]');

if (closestElement != null) {
    let nameElement = closestElement.querySelector('label[data-automation-id="formLabel"]')
    if (nameElement != null) {
        innerText = jQuery.trim(nameElement.innerText);
        if(innerText.length === 0) {
            // Handling of cre. job req. page case
            let cLblElem = jQuery(elem).find('label')[0];
            if(cLblElem !== undefined) {
                innerText = jQuery(cLblElem).attr("data-automation-label");
            }
        }
        innerText = rdoTextTrimmer(innerText);
        return innerText;
    }
}

let parentElement = elem.closest("[data-automation-id='fieldSetBody']");
if (parentElement != null) {
    innerText = parentElement.querySelector('span').getAttribute('aria-label');
}

// handling of "Is relocation offered? (Required) and Is sponsorship offered? (Required) - issue identified during CAT flow exec."        
let grpTitleElm = jQuery(elem).closest("div[role='group']").find("div[data-automation-id='textView']")[0];
if (grpTitleElm !== undefined) {              
    innerText = rdoTextTrimmer(grpTitleElm.textContent);
}

if(jQuery(elem).attr('data-automation-id') === "previousWorker") { //CAT fix
    let legElm = jQuery(elem).closest("div[data-automation-id='formField-']").find('legend[for='+ jQuery(elem).attr('id') +']')[0];
    if (legElm !== undefined) {              
        innerText = rdoTextTrimmer(legElm.textContent);
    }
}

if (innerText != "null") {
    retValue = innerText;
} else {
    innerText = elem.querySelector('label').innerText;
    retValue = innerText;
}

return retValue;


function rdoTextTrimmer(tmpStr) {
    let retVal = tmpStr;
    let charArr = [',','/','(','?','\''];
    for(let i=0;i<charArr.length; i++)
    {
        let charPos = tmpStr.indexOf(charArr[i]);
        if( charPos !== -1 ) {
            retVal = tmpStr.substring(0, charPos);         
            break;
        }        
    } 
    return retVal.trim();
}