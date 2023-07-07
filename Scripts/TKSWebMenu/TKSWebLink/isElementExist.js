var elementId = arguments[0];
var elem = document.getElementById(elementId);

return IsTKSWebLink();
function IsTKSWebLink() {
  if (objExists(elem)) {
      let retValue = true;
    if (
      !(
        elem.offsetParent.parentElement.offsetParent == null ||
        elem.offsetParent.tagName == null ||
        elem.offsetParent.parentElement.offsetParent.offsetParent == null
      )
    ) {
      if (
        elem.offsetParent.parentElement.offsetParent.tagName == "TABLE" ||
        elem.offsetParent.tagName == "TABLE" ||
        elem.offsetParent.parentElement.offsetParent.offsetParent.tagName ==
          "TABLE"
      ) {
          return "false";
      } else {

        let arrParentElems = jQuery(elem).parentsUntil("td");
        if(arrParentElems[arrParentElems.length-1].tagName.toLowerCase() !== "html") {
          // added this condition to check whether the element is part of table or not
          retValue = false;
        }
       
        if(elem.tagName.toLowerCase() === "span") {
           if(elem.parentElement.parentElement.parentElement.firstElementChild.getAttribute("data-automation-id") !== null) {
              if(elem.parentElement.parentElement.parentElement.firstElementChild.getAttribute("data-automation-id").toLowerCase() !== "profileheaderitemtitle") {
                retValue=false;
              }
            }
        }
        if(retValue) {
            return "true";
          } else {
            return "false";
        }
      }
    }
    return "true";
   
  } else {
    return "false";
  }
}

function objExists(tmpObj) {
  if (typeof tmpObj == "undefined" || tmpObj == null) {
    return false;
  }
  if (typeof tmpObj != "object") {
    return false;
  }
  if (!isVisible(tmpObj)) {
    return false;
  }
  return true;
}

function isVisible(obj) {
  if (obj == document) return true;
  if (!obj) return false;
  if (obj.hasOwnProperty("style")) {
    var style = obj.currentStyle;
    if (style) {
      if (style.display == "none") return false;
      if (style.visibility == "hidden") return false;
    }
  } else {
    return true;
  }
}
