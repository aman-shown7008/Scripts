var elementId = arguments[0];
var elem=document.getElementById(elementId);
let retValue = "Empty";
let tmpSmrtXPathSta = "smartxpath|";
let tmpSmrtXPathDyn = "";
let dataAutId;
if(elem.hasAttribute('data-automation-id')) {
    dataAutId = elem.getAttribute('data-automation-id').toLowerCase();
}
let attValue = elem.getAttribute('id');

let retValueElmId = attValue.replace('input','formLabel');
if(document.getElementById(retValueElmId) !== null) {
    retValue=document.getElementById(retValueElmId).textContent;
}

if(retValue.length > 0) {
    tmpSmrtXPathDyn = "//label[translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') ='" + retValue.toLowerCase() + "']/ancestor::li//div[translate(@data-automation-id, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') ='" + dataAutId + "']";
    console.log(tmpSmrtXPathSta + tmpSmrtXPathDyn);
    return tmpSmrtXPathSta + tmpSmrtXPathDyn;
} else {
    console.log("disabled");
    return 'disabled';
}
