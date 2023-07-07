var elementId = arguments[0];
var elem = document.getElementById(elementId);
let IsMatchFound = false;
let retValue = "Empty";
let dataAutId = elem.getAttribute('data-automation-id').toLowerCase();
switch (dataAutId) {
    case "multiselectcontainer":
        if(jQuery(elem).find('div div input').length > 0) {
            let _idElm = jQuery(elem).find('div div input')[0];
            let _idValue = _idElm.getAttribute('id');
            let _lblIdenfy = "Label[for='" + _idValue + "']";
            if(jQuery(_lblIdenfy).length > 0) {
                let _lblElm = jQuery(_lblIdenfy)[0];
                retValue = _lblElm.textContent;
            }  
        }                              
        break;
   
    
    case "selecteditemlist":
        retValue=elem.parentElement.parentElement.parentElement.parentElement.parentElement.previousSibling.innerText;
        break;
	case "phone-device-type":
    case "addresssection_countryregion":
    case "countrydropdown":
    case "sourcedropdown":
         retValue=elem.parentNode.parentElement.parentElement.previousElementSibling.innerText;
        break;
    case "selectwidget":
    case "responsivemonikerinput":
	case "monikerlistsuggestionsinput":
        let attrValue = elem.getAttribute('id');
        let _idValue = attrValue + "-formLabel";
        if(document.getElementById(_idValue) !== null) {
            let _elemLabel = document.getElementById(_idValue);
            if(_elemLabel.innerText.length === 0) {
                // to handle particular case in "Create Job Requisition->Organizations->Division" weblist
                retValue = elem.closest("li").previousSibling.textContent;
            } else {
                retValue = _elemLabel.innerText;
            }
        } else if (elem.parentElement.parentElement.getAttribute("data-automation-id") !== null) {
            let _pElem = elem.parentElement.parentElement;
            if(_pElem.getAttribute("data-automation-id").toLowerCase() === "radiogroupchildwidget") {
                retValue = _pElem.previousElementSibling.textContent;
            } else if(_pElem.getAttribute("data-automation-id").toLowerCase() === "fieldsetcontent") {
                if(_pElem.parentElement !== null) {
                    if(_pElem.parentElement.querySelector('span[data-automation-id="fieldSetLegendLabel"]') !== null) {
                        retValue = _pElem.parentElement.querySelector('span[data-automation-id="fieldSetLegendLabel"]').textContent;
                    }
                }                        
            }
        }
        break;
        case "sourcedropdown"://Update
        case "countrydropdown":
        case "phone-device-type":
        case "degree":
        case "language":
        case "languageproficiency-0": 
        case "languageproficiency-1":
        case "languageproficiency-2":
        case "623f971149831018c1cd91ad45e80000":
        case "623f971149831018c1cd91ad45e80003":
        case "623f971149831018c1cd9246ecf30002":
        case "veteranstatus":
        case "multiselectinputcontainer":
			if(elem.parentElement.parentElement.parentElement.parentElement.innerText === '0 items selected'){
 	            retValue = elem.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;
            }else{
	            retValue = elem.parentElement.parentElement.parentElement.parentElement.innerText;
            }
	    break;
	    case "dateinputwrapper":
            retValue = elem.parentElement.innerText;
        default:
          break;
}
return webListTextTrimmer(retValue);


function webListTextTrimmer(tmpStr) {
    let retVal = tmpStr;
    let charArr = ['?','/','*'];
    for(let i=0;i<charArr.length; i++)
    {
        let charPos = tmpStr.indexOf(charArr[i]);
        if( charPos !== -1 ) {
            retVal = tmpStr.substring(0, charPos);
			if(retVal == '') {
                retVal = tmpStr;
            } 
            break;
        }        
    } 
    return retVal.trim();
  }
