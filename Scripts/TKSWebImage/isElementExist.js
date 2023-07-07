 var elementId = arguments[0];
 var elem = document.getElementById(elementId);

 return IsTKSWebImage();

function IsTKSWebImage() {
    if (objExists(elem)) {
        // try {            
        //     //Added for excluding the element inside the TKSWebTable 
        //     let arrParentElms = jQuery(elem).parentsUntil("table");
        //     if(arrParentElms.length > 0) {  // if the element is part of table
        //         console.log("Kumaresan" + arrParentElms.length);
        //         return "false";
        //     } else {
        //         console.log("Kutti");
        //         return "true";
        //     }
        // } catch (e) {
        //     //keeping JS code in case JQuery fails
        //     if(!((elem.offsetParent)==null)) { 
        //         if(!(((elem.offsetParent.parentElement.offsetParent.tagName)==null)||((elem.offsetParent.tagName)==null))) {
        //             if(((elem.offsetParent.parentElement.offsetParent).tagName=="TABLE")||(elem.offsetParent.tagName=="TABLE"))
        //             {
        //                 return "false";
        //             } 
        //             else 
        //             {   
        //                 return "true";
        //             }
        //         }
        //     }
        //     return "false"
        // }     
        
        
            if(elem.offsetParent !== null) { // adding this condition to handle null cases of offsetParent.

                if(elem.offsetParent.parentElement !== null) { // adding this condition to handle null cases of offsetParent.parentElement.

                    if(elem.offsetParent.parentElement.offsetParent !== null) { // adding this condition to handle null cases of offsetParent.parentElement.offsetParent.
                
                        if(!(((elem.offsetParent.parentElement.offsetParent.tagName)==null)||((elem.offsetParent.tagName)==null))) {
                        
                            if(((elem.offsetParent.parentElement.offsetParent).tagName=="TABLE")||(elem.offsetParent.tagName=="TABLE"))
                            {
                                return "false";
                            } 
                            else 
                            {   
                                let retValue = true;

                                if(elem.getAttribute("data-automation-id") !== null) {
                                    if(elem.getAttribute("data-automation-id").toLowerCase() === "orgchartitem") {
                                        if(elem.firstChild.firstChild.getAttribute("alt") === ""){
                                            retValue = false;
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
                    }
                }
            }
        else {
            return "false";
        }
    }
}


function objExists(tmpObj) {
    if (typeof (tmpObj) == 'undefined' || tmpObj == null) {
        return false;
    }
    if (typeof (tmpObj) != "object") {
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
            if (style.display == 'none') return false;
            if (style.visibility == 'hidden') return false;
        }
    }else{
        return true;
    }
}