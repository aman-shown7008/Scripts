var elementId = arguments[0];
var elems = document.getElementById(elementId);
var columnList = [];
var columnIndex;
var returnValue = "";

return getTableColumnName();
function getTableColumnName() {
  var rows = elems.querySelectorAll("table[data-automation-id='gridHeader'] > tbody > tr");
  if (rows.length == 0) {
    rows = elems.querySelectorAll("table:not([aria-readonly='true']) > thead > tr");
  }  if (rows.length == 0) {
    rows = elems.querySelectorAll("table:not([aria-readonly='true']) > tbody > tr"); //16 feb-2022 updated for multitable
  }
  if (rows.length == 1) {
    var row1 = rows[0];
    let columns = row1.querySelectorAll("td");//taking out td's for every tr -tks11222
	  if (columns.length == 0)
		{
			 columns = row1.querySelectorAll("th");
			
		}
    for (i = 0; i < columns.length; i++) {
        columnIndex=i+1;
      let columnName = getColumnName(columns[i]);
      if (columnName === "Column") columnName = columnName + (i + 1);
      if (columnName !== "") columnList.push(columnName);
    }
  } else {
    //Fix for learning sub-columns for ticket-9899
	//tr tdd
    for (k = 0; k < rows.length - 1; k++) {
   
      let row1 = rows[k];
      let columns = row1.querySelectorAll("td");
		if (columns.length == 0)
		{
			 columns = row1.querySelectorAll("th");//changed-16/2/2022--11222
			
		}
      let replaceCount = 1;
      let columnNum = 0;
      for (i = 0; i < columns.length; i++) {
        columnNum++;
        columnIndex=i+1;
        let columnName = getColumnName(columns[i]);
        if (columnName !== "") { //change here to get column name coming null from below
          let colspan = columns[i].getAttribute("colspan");
          if (colspan != null) {
            if (columnName.trim() == '')
              columnName = "Column" + (i + 1);
            colspan = parseInt(colspan);
            if (colspan > 1) {
              for (j = 0; j < colspan; j++) {
                columnList.push(columnName + "_${" + replaceCount + "}");
                replaceCount++;
                if (j < colspan - 1) columnNum++;
              }
            }
          } else {
            
            columnList.push(columnName);
          }
        }
      }
      let row2 = rows[rows.length - 1];
      columns = row2.querySelectorAll("td");
		if (columns.length == 0)
		{
			 columns = row2.querySelectorAll("th");
			
		}
      for (i = 0; i < columns.length; i++) {
        for (j = 0; j < columnList.length; j++) {
          let substring = "${" + (i + 1).toString() + "}";
          if (columnList[j].includes(substring)) {
            //var newItem = columnList[j].replace(substring, getColumnName(columns[i]));
            var newItem = columnList[j].replace(substring, getColumnNameForColSpan(columns[i], i + 1));
            columnList.splice(j, 1, newItem);
          }
        }
      }
    }
    columnList = columnList.filter(filterFunc);
  }

  columnList.forEach(function value(val) {
    val = val.replace(/[\/,#]/g,'');
    val = val.replace(/  /g,' ');
    val = val.trim();
    returnValue += val + ";"
  });
  return returnValue.substring(0, returnValue.length - 1);
}

function filterFunc(value) {
  return !value.includes("${");
}

function getColumnName(column) {
  let retValue = "";
  //let textElem = column.querySelectorAll("span"); // tks-11222-16 feb-2022-ash
  let textElem = column.querySelectorAll("[data-automation-id*='columnLabel'],.gwt-Label");
    if(textElem.length == 0)
    {
         textElem = column.querySelectorAll("span");
        
    }
  if ((textElem.length > 0) && (!(textElem[0].innerText) == "")) {
    retValue = textElem[0].innerText;
  }
  else {
    if (column.innerText != null) {
			
		if(column.innerText == "")
		{
			return "Column " + columnIndex
		}
      // handling of + button scenarios at positon (0,0) like Create Bulletin & Edit custom report pages
      let butElem = column.querySelector("[data-automation-id='addRow']");
      if ((butElem !== null && butElem.offsetParent !== null)) {
        retValue = "Column";
      } else {
        retValue = column.innerText;
      }
    }
  }
  return retValue;
}

//added for TKS-7279
function getColumnNameForColSpan(column, colSpanIndex) {
  let textElem = column.querySelectorAll("span"); //changed-tks-11222-16 feb-2022
  if ((textElem.length > 0) && (!(textElem[0].innerText) == "")) {
    return textElem[0].innerText;
  }
  else {
    if (column.innerText !== null && column.innerText !== "") return column.innerText;
    else return "Column" + colSpanIndex;
  }
}