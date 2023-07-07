var elementId = arguments[0];
var elem = document.getElementById(elementId);
let retValue = "Empty";
let re = /_/gi;
if (elem.getAttribute('data-automation-id') !== null) {
    if (elem.getAttribute('data-automation-id').toLowerCase() === "current_user") {
        // changes done for catterpillar issue to display as "current_user" rather than name of logged in user
        // double underscore added for a reason, which will be handled in nodejs side
        retValue =   elem.getAttribute('data-automation-id').replace(re,'__');
    } else if (elem.getAttribute('data-automation-id').toLowerCase() === "announcementexpandeditem") {
        retValue = elem.children[1].firstChild.textContent;
    } else if (elem.getAttribute('data-automation-id').toLowerCase() === "taskorchmeganavbarlistitem") {
        retValue = elem.textContent;
    } else if (elem.getAttribute('data-automation-id').toLowerCase() === "relatedactionsbutton") {
        retValue = elem.textContent;
    }else if(elem.getAttribute("data-automation-id").toLowerCase() === "add"){
            retValue = elem.textContent;
    }else if(elem.getAttribute("data-automation-id").toLowerCase() === "add another"){
            retValue = elem.textContent;
    }else if (elem.getAttribute('data-automation-id').toLowerCase() === "searchinputsearchicon") {
        retValue = elem.nextSibling.getAttribute('placeholder');
    } else if ((elem.getAttribute('data-automation-id').toLowerCase() === "inbox-filter-dropdown")
        || (elem.getAttribute('data-automation-id').toLowerCase() === "inbox-sort-dropdown")
        || (elem.getAttribute('data-automation-id').toLowerCase() === "inbox-settings-button")) {
        retValue = elem.querySelector('button > span').getAttribute('title');
    } else if (elem.getAttribute('aria-label') != null) {
        retValue = elem.getAttribute('aria-label');
    } else if (elem.getAttribute('title') != null) {
        retValue = elem.getAttribute('title')
    } else if (elem.innerText != null) {
        retValue = elem.innerText;
    } else {
        retValue = null
    }
    return webButtonTextTrimmer(retValue);
} else {
    if(elem.textContent !== "") {
        retValue = elem.textContent;
    } else if (elem.getAttribute('title') != null) {
        retValue = elem.getAttribute('title')
    }
    return webButtonTextTrimmer(retValue);
}

function webButtonTextTrimmer(tmpStr) {
    let retVal = tmpStr;
    let charArr = ['/'];
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