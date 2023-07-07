var elementId = arguments[0];
var elem=document.getElementById(elementId);
let retValue = "";
let tmpSmrtXPathSta = "smartxpath|";
let tmpSmrtXPathDyn = "";
let dataAutId = elem.getAttribute('data-automation-id').toLowerCase();

switch (dataAutId) {
    case "selectwidget":
    case "responsivemonikerinput":
        let attrValue = elem.getAttribute('id');
        let _idValue = attrValue + "-formLabel";
        if(document.getElementById(_idValue) !== null) {
            let _elemLabel = document.getElementById(_idValue);
            retValue = _elemLabel.innerText;
        } else if (elem.parentElement.parentElement.getAttribute("data-automation-id") !== null) {
            let _pElem = elem.parentElement.parentElement;
            if(_pElem.getAttribute("data-automation-id").toLowerCase() === "radiogroupchildwidget") {
                retValue = _pElem.previousElementSibling.textContent;
            }
        }
        break;
    default:
        break;
}

if(retValue.length > 0) {
    tmpSmrtXPathDyn = "//label[translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') ='" + retValue.toLowerCase() + "']/ancestor::li//div[translate(@data-automation-id, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz') ='" + dataAutId.toLowerCase() + "']";
    //console.log(tmpSmrtXPathSta + tmpSmrtXPathDyn);
    return tmpSmrtXPathSta + tmpSmrtXPathDyn;
} else {
    //console.log("disabled");
    return 'disabled';
}