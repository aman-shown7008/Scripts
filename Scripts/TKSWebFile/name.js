var elementId = arguments[0];
var elem = document.getElementById(elementId);
var fileTitle = elem.getAttribute('title');
var uploadedText1 = elem.getAttribute('data-automation-id');
var uploadedText2 = elem.querySelectorAll("div[data-automation-id='promptOption']");
if (fileTitle == 'Attach') {
    return fileTitle;
} else if(uploadedText1 == 'uploadFileNameLabel'){
    return elem.closest('li[role="presentation"]').querySelectorAll('label[data-automation-id="formLabel"]')[0].innerText;
} else if(uploadedText1 == 'file-upload-drop-zone'){
    return elem.parentElement.parentElement.parentElement.parentElement.parentElement.textContent;
} else if(uploadedText2.length > 0){
    return elem.closest('div').getAttribute('aria-label')
} else {
    var rtn = elem.previousSibling;
	if(rtn != null) {
		return rtn.firstElementChild.innerText;
	}
}