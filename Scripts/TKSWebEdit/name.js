var elementId =arguments[0];
var elem = document.getElementById(elementId);
var value = elem.getAttribute("data-automation-id");
var attOfNumericWidget = elem.getAttribute("aria-describedby");
var temp;
var rtn;
var textValue = "";
switch (value) {
  case "textInputBox":
  case "textAreaField":
  case "numericInput":
    if (
      elem.getAttribute("aria-label") == "Process Comment" ||
      elem.getAttribute("id").toLocaleLowerCase() === "savedfilter-input"
    ) {
      return webEditTextTrimmer(elem.getAttribute("placeholder"));
    } else if (
      elem.getAttribute("id").toLocaleLowerCase() ===
      "wd-advancedfacetedsearch-searchtextbox-input"
    ) {
      return webEditTextTrimmer(elem.getAttribute("aria-label"));
    } else {
      var str = elementId.substring(0, elementId.indexOf("input"));
      temp = str + "formLabel";
      rtn = document.getElementById(temp);
      if (rtn != null) {
        textValue = rtn.textContent;
        // handling of textarea case found during CAT flow execution
        if(textValue.length === 0 && value === "textAreaField") {
          let rtnParentElm = jQuery(rtn)[0].closest('div[role=group]');
          if(rtnParentElm !== null) {
             let lblElem = rtnParentElm.querySelector('div[data-automation-id="textView"]')
             if(lblElem !== null) {
                 textValue = lblElem.innerText;
                 if(textValue === "Please provide the most recent interview date. (Required)") {
                     textValue = "Please provide the most recent interview date";
                 }
             }
          }                     
        }
      }
    }
    return webEditTextTrimmer(textValue);
    break;
  case "dateTimeWidget":
  case "textInput":
  case "numericWidget":
  case "currencyWidget":
    temp = elementId + "-formLabel";
    rtn = document.getElementById(temp);
    if (rtn != null){ 
    textValue = rtn.textContent;
        if(textValue == "")//added below block as date format changed in some webobjects
        {
            textValue=elem.parentElement.parentElement.parentElement.previousSibling.textContent;
            
        }
    }
    return webEditTextTrimmer(textValue);
    break;
  case "numericWidget":
    if (attOfNumericWidget == "gwt-uid-2") {
      return webEditTextTrimmer(document.getElementById("columnheader1-uid6-uid8").innerText);
    } else if (attOfNumericWidget == "gwt-uid-3") {
      return webEditTextTrimmer(document.getElementById("columnheader2-uid6-uid8").innerText);
    } else {
      return;
    }
    break;
  case "userName":
  case "password":
  case "formField-email":
  case "formField-password":
  case "formField-legalNameSection_primary":
  case "formField-legalNameSection_firstName":
  case "formField-phone-number":
  case "formField-verifyPassword":
  case "formField-jobTitle":
  case "formField-company":
  case "formField-location":
  case "formField-":
  case "formField-school":
  case "formField-gpa":
  case "formField-certification-number":
  case "formField-name":
  case "formField-employeeId":
    return webEditTextTrimmer(elem.firstChild.textContent);
    break;
  case 'addressSection_addressLine1':  //Input
  case "legalNameSection_firstNameLocal":
  case "legalNameSection_lastNameLocal":
  case "legalNameSection_firstName":
  case "legalNameSection_lastName":
  case "addressSection_city":
  case "addressSection_postalCode":
  case "phone-number":
  case "phone-extension":
  case "jobTitle":
  case "company":
  case "location":
  case "description":
  case "school":
  case "gpa":
  case "certification-number":
  case "623f971149831018c1cd9246ecf30000":
  case "name":
  case "employeeId":
  case "website":
    return webEditTextTrimmer(elem.parentElement.parentElement.parentElement.innerText);
	break;
  case "richTextEditor":
    return webEditTextTrimmer(elem.closest('li').querySelector('label').innerText);  
  default:
    break;
}

if (
  elem.getAttribute("type") == "text" ||
  elem.getAttribute("type") == "password"
) {
  return webEditTextTrimmer(elem.getAttribute("aria-label"));
}

if (elem.getAttribute("type") == "search") {
  return webEditTextTrimmer(elem.getAttribute("placeholder"));
} else {
  return;
}


function webEditTextTrimmer(tmpStr) {
  let retVal = tmpStr;
  let charArr = ['?','*'];
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