var elementId = arguments[0];
var elem=document.getElementById(elementId)
let retValue = null;

if(elem.getAttribute('data-automation-id')=="checkbox") {
    return;
} else {
    // let attValue = elem.firstChild.getAttribute('id');
    // switch (attValue.toLowerCase())
    // {
    //     case "no_metadata_id-uid6-input": 
    //         //  not sure of this case whether it will work correctly or not now due dynamic id(56$380671) referrence
    //         //  this case can be clubbed together with next case when we identified issue correctly
    //         retValue = document.getElementById("56$380671--uid7-formLabel").textContent;
    //         break;
    //     case "no_metadata_id-uid93-input":
    //         retValue = document.getElementById(elem.parentElement.parentElement.getAttribute("aria-labelledby")).textContent;
    //         break;
    //     default:
    //         let retValueElmId = attValue.replace('input','formLabel');
    //         if(document.getElementById(retValueElmId) !== null) {
    //             retValue=document.getElementById(retValueElmId).textContent;
    //         }
    //         else {
    //             retValue="";
    //         }
    //         break;
    // } return retValue;

    if(elem.closest('li') !== null) {
        if(elem.closest('li').querySelector('label[data-automation-id="formLabel"]') !== null) {
            retValue = elem.closest('li').querySelector('label[data-automation-id="formLabel"]').innerText;
        }                
    } 

    if(retValue === null) {
        if(elem.parentElement !== null) {
            if(elem.parentElement.hasAttribute("title")) {
                retValue = elem.parentElement.getAttribute("title");
            } else if (elem.parentElement.hasAttribute("data-automation-id")) {
                if(elem.parentElement.getAttribute("data-automation-id") === "massActionsSelectAllCheckbox") {
                    let chkAllText = elem.parentElement.parentElement.querySelector('div[data-automation-id="massActionsTotalResultsLabel"]').innerText;                            
                    retValue = chkAllText.split(' ').pop(); // taking only 'results' since numbers are dynamic                             
                }
            }                                  
        }
    }

    if(retValue === null) {
        if(elem.querySelector('input') !== null) {
            if(elem.querySelector('input').hasAttribute("aria-labelledby")) {
                retValue = document.getElementById(elem.querySelector('input').getAttribute("aria-labelledby")).textContent;
            }                        
        }
    }

    if(retValue === null) {
        if(elem.firstChild !== null) {
            if(elem.firstChild.hasAttribute("data-automation-id") !== null) {
                if(elem.firstChild.getAttribute('data-automation-id') === "agreementCheckbox" || elem.firstChild.getAttribute('data-automation-id') === "createAccountCheckbox" || elem.getAttribute("data-automation-id") === "preferredNameCheckbox" || elem.getAttribute("data-automation-id") === "currentlyWorkHere") {
                    let _idValue=elem.firstChild.getAttribute("id");
                    let _lblIdenfy = "label[for=" + _idValue + "]";
                    if(jQuery(_lblIdenfy).length > 0) {
                        let _lblElm = jQuery(_lblIdenfy)[0];
                        if(_lblElm !== undefined){
                            retValue = _lblElm.textContent;
                        }
                    }  
                }               
            }
        }
    }
    //if(retValue === null) {
    //  if(elem.parentElement !== null) {
    //     if(elem.parentElement.parentElement.parentElement.parentElement.previousSibling != null)
    //     {
    //         retValue=elem.parentElement.parentElement.parentElement.parentElement.previousSibling.innerText;
    //     }
    //  }
    //}
	
    if (retValue === null) {
        if(elem.getAttribute("data-automation-id") === "preferredNameCheckbox" || elem.getAttribute("data-automation-id") === "currentlyWorkHere" || elem.getAttribute("data-automation-id") === "nativeLanguage" || elem.getAttribute("data-automation-id") === "agreementCheckbox"){
               retValue = elem.textContent;
        }
    }
    if (retValue === null) {
           if(elem.getAttribute("id") === "93e672dacdb0100015b711d693852246" || elem.getAttribute("id") === "67772ae36794100008ef69bccb3e00b4" || elem.getAttribute("id") === "67772ae3679410000913adc8c20500b6"){
               retValue = elem.parentElement.parentElement.innerText;
        }
    }

    
    return chkTextTrimmer(retValue);    
}


function chkTextTrimmer(tmpStr) {
    if(tmpStr === null || tmpStr === undefined || tmpStr === "") return "";
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