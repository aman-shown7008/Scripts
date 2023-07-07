var elementId = arguments[0];
var elem = document.getElementById(elementId);
let retValue =null;
let tmpElem = null;
 

	if(elem != null){ //Added null condition as few ids were returning null -tks11471
if (elem.previousSibling == null) {
	var checkelem = elem.offsetParent.parentNode.offsetParent;
	if (elem.offsetParent.parentNode.previousSibling !== null)
	if (elem.offsetParent.parentNode.previousSibling.firstElementChild !== null) {
		var theadelem = elem.offsetParent.parentNode.previousSibling.firstElementChild.firstElementChild.firstChild;
	}
}

if(elem.offsetParent !== null) {
	// added for tks-8438
	tmpElem = elem.offsetParent;
}
if(checkelem == null || checkelem == undefined)
	
	{
		let heading =elem.children[1].firstChild.firstChild.textContent;
			 return heading;
	}
 else if (checkelem != null || checkelem != undefined) {
   if (checkelem.hasAttribute('data-automation-groups-as-tabs')) {
	if (checkelem.getAttribute('data-automation-groups-as-tabs') == "true") {
		retValue = theadelem.innerText;
	}
	if(jQuery(checkelem).parents('div[data-uxi-element-id="popupInfo"]').length > 0){
	    //retValue = 	jQuery(checkelem).parents('div[data-uxi-element-id="popupInfo"]').find('h1').text();
	    retValue = 'popupInfo';
	    retValue.trim();
	}
	// handling of CAT case
	if(retValue.length === 0) {
		let tblTabElem = jQuery(elem)[0].closest('div[data-automation-mode="normal"][data-automation-id="tabContent"][role="tabpanel"]');
		if(tblTabElem !== null) {
			if(jQuery(tblTabElem).attr("aria-label") !== undefined) {
				retValue = jQuery(tblTabElem).attr("aria-label");
			}                        
		}
	}
}
 }
else if (jQuery(elem).find("[data-automation-id*='gridTitleLabel']").text() !== "") {
	try {
		retValue = jQuery(elem).find("[data-automation-id*='gridTitleLabel']").text();
	} catch (Exception) {
		retValue = "Jquery error";
	}
} else if (tmpElem !== null && jQuery(tmpElem).find("[data-automation-id*='workletTitle']").text() !== "") {
	// added for tks-8438
	try {
		retValue = jQuery(tmpElem).find("[data-automation-id*='workletTitle']").text();
	} catch (Exception) {
		retValue = "Jquery error";
	}
}
if (retValue == null) {
	if (!((elem.offsetParent.offsetParent.parentElement.parentNode.parentNode.previousSibling) == null)) {
        let elm = elem.offsetParent.offsetParent.parentElement.parentNode.parentNode.previousSibling
	    if(jQuery(elm).find("[data-automation-id='pageHeaderTitleText']").attr('title')!==""){
	        retValue = jQuery(elm).find("[data-automation-id='pageHeaderTitleText']").attr('title')
	    }
	    else{
		retValue = elem.offsetParent.offsetParent.parentElement.parentNode.parentNode.previousSibling.innerText;
	    }
	}
	 else {
		checkelem = document.getElementsByTagName("h1");
		if (checkelem != null) {
			retValue = checkelem[0].innerText;
		} else {
			retValue = null;
		}
	}
}
else if(retValue == ""){
try {
		retValue = jQuery(elem).parentsUntil("section").find("[data-automation-id*='pageHeaderTitleText']").text();
		if(retValue === ""){
			retValue = jQuery("[data-automation-id*='pageHeaderTitleText']").attr('title');
		}
	} catch (Exception) {
		retValue = "Jquery error";
	}
}
return retValue;
	}
	else
	{
		return null;
	}
