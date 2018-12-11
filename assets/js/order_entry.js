var panelID;
var locationID;
var selectedPanels = [];
var testDate;
var selectedOrders = [];
var ordersWitoutResults = [];
var selectedTestForResultEntry;
var orderResult;

var resultsTableCSS = document.createElement("span");
resultsTableCSS.innerHTML = "<style>\
#results-table {\
  width: 100%;\
  overflow: auto;\
  border-collapse: collapse;\
}\
.results-table-headers {\
  background-color: lightgrey;\
}\
.results-table-headers th {\
  text-align: left;\
  padding-left: 5px;\
}\
#results-table td {\
  border-width: 0px 0px 1px 0px;\
  border-style: solid;\
  text-align: center;\
}\
.row_odd {\
  background-color: white;\
}\
.row_even {\
  background-color: aliceblue;\
  color: black;\
}\
#orders-popup-div {\
  display: none;\
  background-color: #F4F4F4;\
  border: 2px solid #E0E0E0;\
  border-radius: 15px;\
  height: 92%;\
  padding: 5px;\
  position: absolute;\
  margin-top: 10px;\
  width: 95%;\
  left: 2%;\
  z-index: 991;\
}\
#orders-cover-div {\
  display: none;\
  position: absolute;\
  background-color: black;\
  width: 100%;\
  height: 102%;\
  left: 0%;\
  top: 0%;\
  z-index: 990;\
  opacity: 0.65;\
}\
#orders-nav-bar {\
  background-color: #333333;\
  height: 80px;\
  bottom: 0px;\
  position: absolute;\
  width: 99%;\
  border-radius: 0px 0px 9px 9px;\
}\
.nav-order-btns {\
  margin-top: 1% !important;\
  width: 150px;\
}\
#input-container {\
  margin-top: 0% !important;\
  height: 87%;\
  width: 100%;\
}\
#date-table {\
  background-color: whitesmoke;\
  width: 400px;\
  border-style: solid;\
  border-width: 1px;\
  border-radius: 25px;\
  top: 20%;\
  position: absolute;\
  left: 23%;\
}\
#date-table td {\
  text-align: center;\
}\
.date-inputs {\
  width: 90px;\
  height: 60px;\
  font-size: 2.0em;\
  text-align: center;\
}\
.date-navButton {\
  width: 120px;\
}\
.buttonContainer {\
  width: 97%;\
  display: table;\
  position: absolute;\
  bottom: 0px;\
  padding: 10px;\
  border-collapse: separate;\
  border-spacing: 5px 10px;\
}\
.buttonContainerRow {\
  display: table-row;\
}\
.buttonContainerCell {\
  display: table-cell;\
  border-width: 1px;\
  border-style: solid;\
  text-align: center;\
  vertical-align: middle;\
  box-shadow: 0 8px 6px -6px black;\
  height: 100px;\
  font-weight: bold;\
  font-size: 20px;\
  color: white;\
}\
#buttonContainerCell-green {\
  background-color: rgb(34, 139, 34);\
}\
#buttonContainerCell-blue {\
  background-color: rgb(79, 148, 205);\
}\
#buttonContainerCell-red {\
  background-color: tomato;\
}\
</style>";

function buildOrderEntry() {
  var frame = document.getElementById('inputFrame' + tstCurrentPage);
  frame.style = 'width: 96%; height: 90%;overflow: auto;';

  try {
    var clearBTN = document.getElementById('clearButton');
    clearBTN.style = 'display: none;';
  }catch(z) {}

  
  var coverDIV = document.createElement('div')
  coverDIV.setAttribute('id','orders-cover-div');

  var popUpDIV = document.createElement('div')
  popUpDIV.setAttribute('id','orders-popup-div');

  var resultsTable = document.createElement('table');
  resultsTable.setAttribute('id','results-table');
  frame.appendChild(resultsTable);

  var thead = document.createElement('thead');
  resultsTable.appendChild(thead);

  var tr = document.createElement('tr');
  tr.setAttribute('class','results-table-headers');
  thead.appendChild(tr);

  var tHeaders = ['Test','Order date','Result','Result date','Given to client'];
  for(var i = 0 ; i < tHeaders.length ; i++){
    var th = document.createElement('th');
    if(i == 1 || i == 3 || i == 4)
      th.style = 'text-align: center;';

    if(i == 2)
      th.style = 'text-align: right; padding-right: 5px;';

    th.innerHTML = tHeaders[i];
    tr.appendChild(th);
  }

  var tbody = document.createElement('tbody');
  tbody.setAttribute('id','lab-orders');
  resultsTable.appendChild(tbody);

  var hmtlBody = document.getElementsByTagName("body")[0];                        
  hmtlBody.appendChild(resultsTableCSS); 

  hmtlBody.appendChild(popUpDIV);
  hmtlBody.appendChild(coverDIV);
  
  var orderBTN = document.createElement('button');
  orderBTN.innerHTML = '<span>Order</span>';
  orderBTN.setAttribute('class','button green navButton');
  orderBTN.setAttribute('onmousedown','orderTest();');
  orderBTN.setAttribute('id','order-entery-button');
  var root = document.getElementById('buttons');
  root.appendChild(orderBTN);

  var enterResult = document.createElement('button');
  enterResult.innerHTML = '<span>Enter results</span>';
  enterResult.setAttribute('class','button blue navButton');
  enterResult.setAttribute('id','result-entery-button');
  enterResult.setAttribute('onmousedown','enterResults();');
  var root = document.getElementById('buttons');
  root.appendChild(enterResult);

  next_button = document.getElementById('nextButton');
  if(next_button){
    var attr = next_button.getAttribute('onmousedown');
    var onmousedown_attr = attr + ";removeOrderEntry();";
    next_button.setAttribute('onmousedown', onmousedown_attr);
  }


  getOrders();
}

function removeOrderEntry() {
  orderBTN  = document.getElementById('order-entery-button');
  resultBTN = document.getElementById('result-entery-button');
  var root = document.getElementById('buttons');
  root.removeChild(orderBTN); 
  root.removeChild(resultBTN); 
}

function orderTest() {
  var popUpBox = document.getElementById('orders-popup-div');
  var coverDIV = document.getElementById('orders-cover-div');

  coverDIV.style = 'display: inline;';
  popUpBox.style = 'display: inline;';



  var ordersNavBar = document.createElement('div');
  ordersNavBar.setAttribute('id','orders-nav-bar');
  popUpBox.appendChild(ordersNavBar);


  var nextB = document.createElement('button');
  nextB.innerHTML = '<span>Next</span>';
  nextB.setAttribute('class','button green navButton nav-order-btns');
  nextB.setAttribute('onmousedown','nextChapter(0);');
  nextB.setAttribute('id','next-button');
  ordersNavBar.appendChild(nextB);

  var cancelB = document.createElement('button');
  cancelB.innerHTML = '<span>Cancel</span>';
  cancelB.style = 'float: left; left: 5px;';
  cancelB.setAttribute('class','button red navButton nav-order-btns');
  cancelB.setAttribute('onmousedown','cancelOrder();');
  ordersNavBar.appendChild(cancelB);
  
  var orderDiv = document.createElement('div');
  orderDiv.setAttribute('id','input-container'); 
  popUpBox.appendChild(orderDiv);


  addOrders();
}

function addOrders() {
  var container = document.getElementById('input-container');

   var helpText = document.createElement('label');
   helpText.innerHTML = 'Lab orders';
   helpText.setAttribute('class','helpTextClass');
   container.appendChild(helpText);

  var serachR = document.createElement('div');
  serachR.style = "display: table;width: 100%;";
  container.appendChild(serachR);
  
  var serachRrow = document.createElement('div');
  serachRrow.style = "display: table-row;";
  serachR.appendChild(serachRrow);
  
  var serachRcell = document.createElement('div');
  var CSSstyle = "display: table-cell;";
  CSSstyle += 'border-width: 1px 1px 0px 1px;border-style: solid;';
  CSSstyle += 'border-radius: 9px 9px 0px 0px;';
  serachRcell.style = CSSstyle;
  serachRrow.appendChild(serachRcell);

  var inputBox = document.createElement('input');
  inputBox.setAttribute('type','text');
//  inputBox.style = 'width: 100%;border-style: solid; border-width: 0px 0px 1px 0px;'
  //inputBox.style += 'height: 80px;';
  inputBox.setAttribute('class','touchscreenTextInput');
  inputBox.setAttribute('id','input-lab-order');
  serachRcell.appendChild(inputBox);
 
 
  var serachRrow = document.createElement('div');
  serachRrow.style = "display: table-row;";
  serachR.appendChild(serachRrow);
  
  var serachRcell = document.createElement('div');
  serachRcell.style = "display: table-cell;";
  serachRrow.appendChild(serachRcell);
  
  var viewPort = document.createElement('div');
  viewPort.setAttribute('class','options scrollable');
  viewPort.setAttribute('id','test-orders');
  var cssText = "border: solid 1px;border-radius: 0px 0px 9px 9px;";
  viewPort.style = cssText;
  serachRcell.appendChild(viewPort);

  var keyboardContainer = document.createElement('div');
  keyboardContainer.setAttribute('id','keyboard-container');
  var cssText = "border: solid 1px; border-radius: 9px 9px 9px 9px;";
  cssText += "margin-top: 15px;";
  keyboardContainer.style = cssText;
  container.appendChild(keyboardContainer);

  addKeyboardKeys(keyboardContainer);
  
  nextB = document.getElementById('next-button');
  nextB.setAttribute('onmousedown','nextChapter(0);');
}

function addKeyboardKeys(e) {
  var keyboard = document.createElement('div');
  keyboard.setAttribute('id','orders-keyboard');
  var ccsText = 'display: table; width: 100%;';
  var ccsText = 'padding: 5px 0px 5px 0px;';
  keyboard.style = ccsText;
  e.appendChild(keyboard);

  var keys =  [
    ['Q','W','E','R','T','Y','U','I','O','P','Delete'],
    ['A','S','D','F','G','H','J','K',"'",'0-9','Clear'],
    ['Z','X','C','V','B','N','M','.','A-Z','Space']
  ];

  for(var i = 0 ; i < keys.length ; i++){
    var subKeys = keys[i];
    var keyboardRow = document.createElement('div');
    var ccsText = 'display: table-row;';
    keyboardRow.style = ccsText;
    keyboard.appendChild(keyboardRow);

    for(var x = 0 ; x < subKeys.length ; x++){
      var keyboardCell = document.createElement('div');
      var ccsText = 'display: table-cell;';
      keyboardCell.style = ccsText;
      
      var keyboardBtn = document.createElement('button');
      keyboardBtn.innerHTML = '<span>' + subKeys[x] + '</span>';
      keyboardBtn.setAttribute('class','keyboardButton');
      keyboardBtn.setAttribute('key', subKeys[x]);
      keyboardBtn.setAttribute('onmousedown','keyboardPress(this);');
      keyboardCell.appendChild(keyboardBtn);
      keyboardRow.appendChild(keyboardCell);
    }

  }

  //loadLabOrders();
  var inputBox = document.getElementById('input-lab-order');
  loadFunction = 'loadLabOrders()';
   
  if(inputBox == undefined){
    inputBox = document.getElementById('input-lab-location'); 
    loadFunction = 'loadLocations()';
  }

  eval(loadFunction);
}

function keyboardPress(key) {
  var inputBox = document.getElementById('input-lab-order');
  loadFunction = 'loadLabOrders()';
   
  if(inputBox == undefined){
    inputBox = document.getElementById('input-lab-location'); 
    loadFunction = 'loadLocations()';
  }

  try{                                                                          
                                                                                
    if(key.getAttribute('key').match(/Del/i)){                                            
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);  
    }else if(key.getAttribute('key').match(/Clear/i)){                                    
      inputBox.value = null;
    }else if(key.getAttribute('key').match(/Space/i)){                                    
      inputBox.value += " ";                                          
    }else if(key.getAttribute('key') == '0-9'){                                    
    }else if(key.getAttribute('key') == 'A-Z'){                                    
    }else{                                                                      
      inputBox.value += key.getAttribute('key');                                          
    }                                                                           
                                                                                
  }catch(x) { }                                                                 
                                                                                
  //loadLabOrders();
  eval(loadFunction);
}

function cancelOrder() {
  var box = document.getElementById('orders-popup-div')
  box.innerHTML = null;
  box.style = 'display: none;';
  document.getElementById('orders-cover-div').style = 'display: none;';

  panelID = null;
  locationID  = null;
  testDate = null;
  selectedPanels = [];
  selectedOrders = [];
  selectedTestForResultEntry = null;
  orderResult = null;

}

function getOrders() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/programs/1/lab_tests/orders?patient_id=" + sessionStorage.patientID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      var tbody = document.getElementById('lab-orders');
      tbody.innerHTML = null;
      ordersWitoutResults = [];

      for(var i = 0 ; i < obj.length ; i++){
        var evenODD = i % 2 == 0 ? "odd" : "even";

        var tr = document.createElement('tr');
        tr.setAttribute('class','row_' + evenODD);
        tbody.appendChild(tr);

        var td = document.createElement('td');
        try {
          var test_name = obj[i].lab_sample.lab_parameter.test_type.TestName;
          td.innerHTML = test_name.replace(/_/g, " ");
        }catch(e){
          td.innerHTML = '&nbsp;';
        }
        td.setAttribute('style','text-align: left; padding-left: 5px;')
        tr.appendChild(td);

        var td = document.createElement('td');
        try {
          td.innerHTML = formatDate(new Date(obj[i].OrderDate));
        }catch(x) {
          td.innerHTML = '&nbsp;';
        }
        tr.appendChild(td);

        var td = document.createElement('td');
        td.style = 'text-align: right; padding-right: 10px;';
        try {
          var range = obj[i].lab_sample.lab_parameter.Range
          td.innerHTML = (range + obj[i].lab_sample.lab_parameter.TESTVALUE);
        }catch(e){
          td.innerHTML = '&nbsp;';
        }
        tr.appendChild(td);

        var td = document.createElement('td');
        try {
          td.innerHTML = formatDate(new Date(obj[i].lab_sample.DATE));
        }catch(e){
          td.innerHTML = '&nbsp;';
        }
        tr.appendChild(td);

        var td = document.createElement('td');
        tr.appendChild(td);

        /* ................. all samples without results starts ................................. */
        try {
          var lab_sample_result = obj[i].lab_sample.lab_parameter.TESTVALUE
          if(lab_sample_result == null){
            ordersWitoutResults.push({
              order_date: obj[i].OrderDate,
              accession_number: obj[i].Pat_ID,
              sample_id: obj[i].lab_sample.Sample_ID,
              test_name: obj[i].lab_sample.lab_parameter.test_type.TestName,
              test_type: obj[i].lab_sample.lab_parameter.test_type.TestType
            });
          }
        }catch(z) {
          continue;
        }
        /* ................. ends ................................. */

        /* ................ 
        Getting all VL results to be use to calculate for next VL popup
        */
        if(obj[i].TestOrdered == 'HIV viral load'){
          try {
            var range = obj[i].lab_sample.lab_sample.Range
          }catch(r) {
            var range = null;
          }
          vlResults.push({
            order_date: obj[i].OrderDate,
            accession_number: obj[i].Pat_ID,
            sample_id: obj[i].lab_sample.Sample_ID,
            test_name: obj[i].lab_sample.lab_parameter.test_type.TestName,
            test_type: obj[i].lab_sample.lab_parameter.test_type.TestType,
            result: obj[i].lab_sample.lab_parameter.TESTVALUE,
            range: range, 
            result_date: obj[i].lab_sample.DATE
          });
        }
        /* ......................... ends ............................... */

      }
      getARTstartedDate();
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function loadLabOrders() {
  var search_string = document.getElementById('input-lab-order').value;
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/programs/1/lab_tests/types/?search_string=" + search_string;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      var r = document.getElementById('test-orders');
      r.innerHTML = null;
      var ul = document.createElement('ul');

      for(var i = 0 ; i < obj.length ; i++){
        var li = document.createElement('li');
        li.innerHTML = obj[i].TestName;
        li.setAttribute('value', obj[i].Panel_ID);
        li.setAttribute('id', i);
        li.setAttribute('class', 'test-order-list');
        li.setAttribute('onmousedown', "selectOrder(this);");
        ul.appendChild(li);
      }
      r.appendChild(ul);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function selectOrder(e) {
  var list = document.getElementsByClassName('test-order-list');

  for(var i = 0 ; i < list.length ; i++){
    list[i].style = 'background-color: ""';
  }

  e.style = 'background-color: lightblue;';
  document.getElementById('input-lab-order').value = e.innerHTML;
  panelID = e.value;
}

function nextChapter(num) {
  
  if(num == 0 && panelID == undefined){
    showMessage('Please select Lab order');
    return;
  }else if(num == 1 && selectedPanels.length < 1){
    showMessage('Please select tests');
    return;
  }else if(num == 2 && testDate == undefined){
    showMessage('Please select test date');
    return;
  }else if(num == 3 && selectedTestForResultEntry == undefined){
    showMessage('Please select test');
    return;
  }
  
  var next = (parseInt(num) + 1);
  var popUpBox = document.getElementById('orders-popup-div');                   
  var coverDIV = document.getElementById('orders-cover-div');

  var container = document.getElementById('input-container');
  container.innerHTML = null;

  if(next == 0){
    addOrders();
  }else if(next == 1){
    buildLabTestTypes();
  }else if(next == 2){
    buildTestDate();
  }else if(next == 3){
    buildLabLocations();
  }else if(next == 4){
    buildEnteryDate();
  }else if(next == 5){
    buildResultEnteryKeypad();
  }
}

function previousPage(num) {
  var container = document.getElementById('input-container');
  var root = document.getElementById('orders-nav-bar');
  container.innerHTML = null;
  var backBTN = document.getElementById('previous-button');
  
  if(num == 0){
    addOrders();
    root.removeChild(backBTN);
  }else if(num == 1){
    root.removeChild(backBTN)
    buildLabTestTypes();
  }else if(num == 2){
    var nextB = document.getElementById('next-button');
    nextB.innerHTML = "<span>Next</span>";
    buildTestDate();
  }else if(num == 3){
    root.removeChild(backBTN);
    var nextB = document.getElementById('next-button');
    nextB.setAttribute('onmousedown','nextChapter(3);');
    addResultsInputs();
  }else if(num == 4){
    root.removeChild(backBTN)
    var nextB = document.getElementById('next-button');
    nextB.setAttribute('onmousedown','nextChapter(3);');
    buildEnteryDate();
  }
}

function buildLabTestTypes() {
  var backBTN = document.createElement('button');
  var container = document.getElementById('input-container');

  backBTN.innerHTML = '<span>Back</span>';
  backBTN.setAttribute('class','button blue navButton nav-order-btns');
  backBTN.setAttribute('onmousedown','previousPage(0);');
  backBTN.setAttribute('id','previous-button');
  var root = document.getElementById('orders-nav-bar');
  root.appendChild(backBTN);

  var nextB = document.getElementById('next-button')
  nextB.setAttribute('onmousedown','nextChapter(1);');

   var helpText = document.createElement('label');
   helpText.innerHTML = 'Test types';
   helpText.setAttribute('class','helpTextClass');
   container.appendChild(helpText);

  var test_types = document.createElement('div');
  var cssText = 'border-style: solid; border-width: 1px;';
  cssText += 'height: 90%; overflow: auto;';
  cssText += 'border-radius: 9px 9px 9px 9px;'
  test_types.setAttribute('id','panels');
  test_types.style = cssText;

  container.appendChild(test_types);

  getLabTestType();
}

function getLabTestType() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/programs/1/lab_tests/types?panel_id=" + panelID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      loadPanels(obj);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function loadPanels(data) {
  var panels = document.getElementById('panels');
  panels.setAttribute('class','options');

  var panelContainer = document.createElement('div');
  panelContainer.setAttribute('class','scrollable');
  panels.appendChild(panelContainer);

  var ul = document.createElement('ul');
  panelContainer.appendChild(ul);

  for(var i = 0 ; i < data.length ; i++){

    var li = document.createElement('li');
    li.setAttribute('class', 'test-panel-list');
    li.setAttribute('tstvalue', 'panel-list');
    li.setAttribute('testType', data[i].TestType);
    li.setAttribute('panel-id', data[i].ID);
    li.setAttribute('onmousedown','updateSelectedPanels(this);');
    li.style = '';

    var div1 = document.createElement('div');
    div1.style = 'display: table; border-spacing: 0px;';
    li.appendChild(div1);

    var div2 = document.createElement('div');
    div2.style = 'display: table-cell;';
    div1.appendChild(div2);

    var img = document.createElement('img');
    img.setAttribute('src','/public/touchscreentoolkit/lib/images/unticked.jpg');
    img.setAttribute('alt', '[ ]');
    img.setAttribute('id', 'checkbox-' + data[i].ID);
    div2.appendChild(img);

    var div3 = document.createElement('div');
    div3.style = 'display: table-cell; vertical-align: middle; text-align: left; padding-left: 15px;';
    div3.innerHTML = data[i].TestName;
    div1.appendChild(div3);


    ul.appendChild(li);

  }

}

function updateSelectedPanels(e) {
  var list = document.getElementsByClassName('test-panel-list');
  var img = document.getElementById('checkbox-' + e.getAttribute('panel-id'));

  if(e.getAttribute('style').match(/lightblue/)) {
    img.setAttribute('src','/public/touchscreentoolkit/lib/images/unticked.jpg');
    e.style = 'background-color: ""';
    var tempList = [];
    for(var i = 0 ; i < selectedPanels.length ; i++){
      if(parseInt(selectedPanels[i]) != parseInt(e.getAttribute('testtype'))){
        tempList.push(selectedPanels[i]);
      }
    }
    selectedPanels = tempList;
  }else{
    img.setAttribute('src','/public/touchscreentoolkit/lib/images/ticked.jpg');
    e.style = 'background-color: lightblue;';
    selectedPanels.push(parseInt(e.getAttribute('testtype')));
  }
}

function buildTestDate() {
  var container = document.getElementById('input-container');
  
  var helpText = document.createElement('label');
  helpText.innerHTML = 'Test date';
  helpText.setAttribute('class','helpTextClass');
  container.appendChild(helpText);

  addDate(container, 'order-test');
}

function addDate(e, transaction_type) {

  var dateContainer = document.createElement('div');
  dateContainer.setAttribute('id','date-container');
  var ccsText = "border: solid 1px;height: 90%;border-radius: 9px;"
  dateContainer.style = ccsText;
  e.appendChild(dateContainer);

  var inputBoxDIV = document.createElement('div');
  var CSSstyle = 'border-width: 0px 0px 1px 0px;border-style: solid;';
  inputBoxDIV.style = CSSstyle;
  dateContainer.appendChild(inputBoxDIV);

  var inputBox = document.createElement('input');
  inputBox.setAttribute('type','text');
  inputBox.setAttribute('class','touchscreenTextInput');
  inputBox.setAttribute('id','input-text-date');
  inputBox.readOnly = true; 
  inputBoxDIV.appendChild(inputBox);

  var table = document.createElement('table');
  table.setAttribute('id','date-table');
  dateContainer.appendChild(table);

  var tr = document.createElement('tr');
  table.appendChild(tr);

  var upperDeck = [
    ['dateselector_nextDay','+Day','<span>+</span>','&nbsp;'],
    ['dateselector_nextMonth','+Month','<span>+</span>','&nbsp;'],
    ['dateselector_nextYear','+Year','<span>+</span>','&nbsp;']
  ];

  for(var i = 0 ; i < upperDeck.length ; i++){
    var td = document.createElement('td');
    var btn = document.createElement('button');
    btn.setAttribute('class','date-navButton');
    btn.setAttribute('id', upperDeck[i][0]);
    btn.setAttribute('onmousedown',"'" + upperDeck[i][1] + "'");
    btn.setAttribute('onmousedown','adjuastDate(this);');
    btn.setAttribute('adjuastment', upperDeck[i][1]);
    btn.innerHTML = upperDeck[i][2];
    td.appendChild(btn);
    tr.appendChild(td);
  }


  var miidleDeck = [['day-input'],['month-input'],['year-input'],['today-button']];
  var tr = document.createElement('tr');
  table.appendChild(tr);

  for(var i = 0 ; i < miidleDeck.length ; i++){
    if(miidleDeck[i][0] == 'today-button'){ 
      var td = document.createElement('td');
      var btn = document.createElement('button');
      btn.setAttribute('class','red date-navButton');
      btn.setAttribute('id', miidleDeck[i][0]);
      btn.setAttribute('onmousedown',"setDateToDay(this);");
      btn.innerHTML = '<span>Today</span>';
      td.appendChild(btn);
      tr.appendChild(td);
      continue;
    }

    var td = document.createElement('td');
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('class','date-inputs');
    input.setAttribute('id', miidleDeck[i][0]);
    td.appendChild(input);
    tr.appendChild(td);
  }

  var lowerDeck = [
    ['dateselector_prevDay','-Day','<span>-</span>'],
    ['dateselector_prevMonth','-Month','<span>-</span>'],
    ['dateselector_prevYear','-Year','<span>-</span>']
  ];
  var tr = document.createElement('tr');
  table.appendChild(tr);

  for(var i = 0 ; i < lowerDeck.length ; i++){
    var td = document.createElement('td');
    var btn = document.createElement('button');
    btn.setAttribute('id', lowerDeck[i][0]);
    btn.setAttribute('onmousedown','adjuastDate(this);');
    btn.setAttribute('adjuastment', lowerDeck[i][1]);
    btn.setAttribute('class','date-navButton');
    btn.innerHTML = lowerDeck[i][2];
    td.appendChild(btn);
    tr.appendChild(td);
  }

  var currentDay    = sessionStorage.sessionDate.split('/')[0];
  var currentMonth  = sessionStorage.sessionDate.split('/')[1];
  var currentYear   = sessionStorage.sessionDate.split('/')[2];
  
  document.getElementById('day-input').value = currentDay;
  document.getElementById('month-input').value = currentMonth;
  document.getElementById('year-input').value = currentYear;

  if(transaction_type == 'order-test') {
    var prevBTN = document.getElementById('previous-button');
    prevBTN.setAttribute('onmousedown','previousPage(1);');
    var nextBTN = document.getElementById('next-button');
    nextBTN.setAttribute('onmousedown','nextChapter(2);');
  }else{
    var nextBTN = document.getElementById('next-button');
    nextBTN.setAttribute('onmousedown','nextChapter(4);');
    nextBTN.innerHTML = '<span>Next</span>';
  }

}

function setDateToDay(e) {
  var inputBox = document.getElementById('input-text-date');
  inputBox.value = formatDate(new Date);
  
  var currentDay    = inputBox.value.split('/')[0];
  var currentMonth  = inputBox.value.split('/')[1];
  var currentYear   = inputBox.value.split('/')[2];
  
  document.getElementById('day-input').value = currentDay;
  document.getElementById('month-input').value = currentMonth;
  document.getElementById('year-input').value = currentYear;
  
  testDate = (currentYear + '-' + getMonthInNum(currentMonth) + '-' + currentDay)
}

function adjuastDate(e) {
  var adjuastment = e.getAttribute('adjuastment');
  var inputBox = document.getElementById('input-text-date');
  if(inputBox.value.length < 1){
    var currentDate = new Date(sessionStorage.sessionDate);
  }else{
    var currentDate = new Date(inputBox.value);
  }
 
  if(adjuastment == '+Day'){
    currentDate.setDate(currentDate.getDate() + 1);
  }else if(adjuastment == '-Day'){
    currentDate.setDate(currentDate.getDate() - 1);
  }else if(adjuastment == '+Month'){
    currentDate.setMonth(currentDate.getMonth() + 1);
  }else if(adjuastment == '-Month'){
    currentDate.setMonth(currentDate.getMonth() - 1);
  }else if(adjuastment == '+Year'){
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }else if(adjuastment == '-Year'){
    currentDate.setFullYear(currentDate.getFullYear() - 1);
  }

  var systemSetDate = new Date(sessionStorage.sessionDate);
  if(systemSetDate < currentDate){
    showMessage('Date set would be greater than session date');
    return;
  }

  inputBox.value = formatDate(currentDate);
  var currentDay    = inputBox.value.split('/')[0];
  var currentMonth  = inputBox.value.split('/')[1];
  var currentYear   = inputBox.value.split('/')[2];
  
  document.getElementById('day-input').value = currentDay;
  document.getElementById('month-input').value = currentMonth;
  document.getElementById('year-input').value = currentYear;

  testDate = (currentYear + '-' + getMonthInNum(currentMonth) + '-' + currentDay);

}

function formatDate(dateOBJ) {
  var day = dateOBJ.getDate();
  var month = monthInText(dateOBJ.getMonth());
  var year = dateOBJ.getFullYear();

  if(parseInt(day) < 10)
    day = '0' + day;

  return (day + '/' + month + '/' + year); 
}

function monthInText(num) {
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  return month[num];
}

function getMonthInNum(month_str) {
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  
  var m;
  for(var i = 0 ; i < month.length ; i++){
    if(month[i] == month_str)
      m = (i + 1);
  }
  return m;
}

function buildLabLocations() {
  var container = document.getElementById('input-container');

   var helpText = document.createElement('label');
   helpText.innerHTML = 'Lab location <span style="font-size: 15px;">(where the sample(s) being sent)</span>';
   helpText.setAttribute('class','helpTextClass');
   container.appendChild(helpText);

  var serachR = document.createElement('div');
  serachR.style = "display: table;width: 100%;";
  container.appendChild(serachR);
  
  var serachRrow = document.createElement('div');
  serachRrow.style = "display: table-row;";
  serachR.appendChild(serachRrow);
  
  var serachRcell = document.createElement('div');
  var CSSstyle = "display: table-cell;";
  CSSstyle += 'border-width: 1px 1px 0px 1px;border-style: solid;';
  CSSstyle += 'border-radius: 9px 9px 0px 0px;';
  serachRcell.style = CSSstyle;
  serachRrow.appendChild(serachRcell);

  var inputBox = document.createElement('input');
  inputBox.setAttribute('type','text');
//  inputBox.style = 'width: 100%;border-style: solid; border-width: 0px 0px 1px 0px;'
  //inputBox.style += 'height: 80px;';
  inputBox.setAttribute('class','touchscreenTextInput');
  inputBox.setAttribute('id','input-lab-location');
  serachRcell.appendChild(inputBox);
 
 
  var serachRrow = document.createElement('div');
  serachRrow.style = "display: table-row;";
  serachR.appendChild(serachRrow);
  
  var serachRcell = document.createElement('div');
  serachRcell.style = "display: table-cell;";
  serachRrow.appendChild(serachRcell);
  
  var viewPort = document.createElement('div');
  viewPort.setAttribute('class','options scrollable');
  viewPort.setAttribute('id','test-lab-locations');
  var cssText = "border: solid 1px;border-radius: 0px 0px 9px 9px;";
  viewPort.style = cssText;
  serachRcell.appendChild(viewPort);

  var keyboardContainer = document.createElement('div');
  keyboardContainer.setAttribute('id','keyboard-container');
  var cssText = "border: solid 1px; border-radius: 9px 9px 9px 9px;";
  cssText += "margin-top: 15px;";
  keyboardContainer.style = cssText;
  container.appendChild(keyboardContainer);

  addKeyboardKeys(keyboardContainer);
  
  prevBTN = document.getElementById('previous-button');
  prevBTN.setAttribute('onmousedown','previousPage(2);');

  nextB = document.getElementById('next-button');
  nextB.innerHTML = '<span>Finish</span>';
  nextB.setAttribute('onmousedown','createOrder(this);');
}

function loadLocations() {
  var search_string = document.getElementById('input-lab-location').value;
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/locations?name='+search_string;      

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
      var r = document.getElementById('test-lab-locations');
      r.innerHTML = null;
      var ul = document.createElement('ul');

      for(var i = 0 ; i < obj.length ; i++){
        var li = document.createElement('li');
        li.innerHTML = obj[i].name;
        li.setAttribute('value', obj[i].location_id);
        li.setAttribute('id', i);
        li.setAttribute('class', 'test-order-location');
        li.setAttribute('onmousedown', "selectLocation(this);");
        ul.appendChild(li);
      }
      r.appendChild(ul);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function selectLocation(e) {
  var list = document.getElementsByClassName('test-order-location');

  for(var i = 0 ; i < list.length ; i++){
    list[i].style = 'background-color: ""';
  }

  e.style = 'background-color: lightblue;';
  document.getElementById('input-lab-location').value = e.innerHTML;
  locationID = e.value;
}

function createOrder(e) {
  if(locationID == undefined){
    showMessage('Please select Lab loacation');
    return;
  }else if(selectedPanels.length < 1){
    showMessage('Please select tests');
    return;
  }else if(testDate == undefined){
    showMessage('Please select test date');
    return;
  }

  e.setAttribute('onmousedown','');
  submitOrders();                                                   
}

function submitOrders() {                                                       
  var encounter = {                                                             
    encounter_type_id:  57,                                                   
    patient_id: sessionStorage.patientID,                                                    
    encounter_datetime: null                                                  
  }                                                                             
  submitParameters(encounter, "/encounters", "setOrders");                      
} 

function setOrders(encounter) {
  for(var i = 0 ; i < selectedPanels.length ; i++){
    selectedOrders.push({
      encounter_id: encounter.encounter_id,
      test_type_id: selectedPanels[i],
      date: testDate
    });
  }

  postOrders(selectedOrders[0]);
}
  

function postOrders(order) {                               
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/programs/1/lab_tests/orders?patient_id=' + sessionStorage.patientID;
  
  
  var parametersPassed = JSON.stringify(order);
  selectedOrders.shift();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      if(selectedOrders.length > 0) {
        postOrders(selectedOrders[0]);
      }else{
        showMessage('Created orders');
        cancelOrder();
        getOrders();
      }
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}

function enterResults() {
  var popUpBox = document.getElementById('orders-popup-div');
  var coverDIV = document.getElementById('orders-cover-div');

  coverDIV.style = 'display: inline;';
  popUpBox.style = 'display: inline;';
 
  popUpBox.innerHTML = null; 
  
  var ordersNavBar = document.createElement('div');
  ordersNavBar.setAttribute('id','orders-nav-bar');
  popUpBox.appendChild(ordersNavBar);


  var nextB = document.createElement('button');
  nextB.innerHTML = '<span>Next</span>';
  nextB.setAttribute('class','button green navButton nav-order-btns');
  nextB.setAttribute('onmousedown','nextChapter(3);');
  nextB.setAttribute('id','next-button');
  ordersNavBar.appendChild(nextB);

  var cancelB = document.createElement('button');
  cancelB.innerHTML = '<span>Cancel</span>';
  cancelB.style = 'float: left; left: 5px;';
  cancelB.setAttribute('class','button red navButton nav-order-btns');
  cancelB.setAttribute('onmousedown','cancelOrder();');
  ordersNavBar.appendChild(cancelB);
  
  var orderDiv = document.createElement('div');
  orderDiv.setAttribute('id','input-container'); 
  popUpBox.appendChild(orderDiv);

  addResultsInputs();
}

function addResultsInputs() {
  var container = document.getElementById('input-container');

  var helpText = document.createElement('label');
  helpText.innerHTML = 'Select test';
  helpText.setAttribute('class','helpTextClass');
  container.appendChild(helpText);

  var inputDIV = document.createElement('div');
  var inputDIVstyle = 'border-style: solid; border-width: 1px 1px 0px 1px;';
  inputDIVstyle += 'border-radius: 9px 9px 0px 0px;';
  inputDIV.style = inputDIVstyle;
  container.appendChild(inputDIV);

  var input = document.createElement('input');
  input.setAttribute('id','selected-test');
  input.setAttribute('type','text');
  input.setAttribute('class','touchscreenTextInput');
  input. readOnly = true;
  inputDIV.appendChild(input);
  
  var options = document.createElement('div');
  options.setAttribute('class','options');
  var inputDIVstyle = 'border-style: solid; border-width: 0px 1px 1px 1px;';
  inputDIVstyle += 'border-radius: 0px 0px 9px 9px; height: 85%;';
  options.style = inputDIVstyle;
  container.appendChild(options);

  var viewport = document.createElement('div');
  viewport.setAttribute('class','scrollable');
  viewport.setAttribute('id','orders-without-results');
  options.appendChild(viewport);

  var ul = document.createElement('ul');
  viewport.appendChild(ul);

  for(var i = 0 ; i < ordersWitoutResults.length ; i++){
    var li = document.createElement('li');
    li.innerHTML = ordersWitoutResults[i].test_name.replace(/_/g, " ");
    li.setAttribute('value', ordersWitoutResults[i].test_type);
    li.setAttribute('accession_number', ordersWitoutResults[i].accession_number);
    li.setAttribute('id', i);
    li.setAttribute('class', 'test-order-without-results');
    li.setAttribute('onmousedown', "selectTest(this);");
    ul.appendChild(li);
  }


}

function selectTest(e) {
  var list = document.getElementsByClassName('test-order-without-results');

  for(var i = 0 ; i < list.length ; i++){
    list[i].style = 'background-color: ""';
  }

  e.style = 'background-color: lightblue;';
  document.getElementById('selected-test').value = e.innerHTML;
  selectedTestForResultEntry = e.getAttribute('accession_number');
}

function buildEnteryDate() {
  var container = document.getElementById('input-container');
  
  var helpText = document.createElement('label');
  helpText.innerHTML = 'Test result date';
  helpText.setAttribute('class','helpTextClass');
  container.appendChild(helpText);
  addDate(container, 'enter-test-result');
 
  var backBTN = document.createElement('button'); 
  backBTN.innerHTML = '<span>Back</span>';
  backBTN.setAttribute('class','button blue navButton nav-order-btns');
  backBTN.setAttribute('onmousedown','previousPage(3);');
  backBTN.setAttribute('id','previous-button');
  var root = document.getElementById('orders-nav-bar');
  root.appendChild(backBTN);
    
  var nextB = document.getElementById('next-button');
  nextB.setAttribute('onmousedown','nextChapter(4);');
}

function buildResultEnteryKeypad() {
  var container = document.getElementById('input-container');

  var helpText = document.createElement('label');
  helpText.innerHTML = 'Result entry';
  helpText.setAttribute('class','helpTextClass');
  container.appendChild(helpText);

  var inputDIV = document.createElement('div');
  var inputDIVstyle = 'border-style: solid; border-width: 1px 1px 0px 1px;';
  inputDIVstyle += 'border-radius: 9px 9px 0px 0px;';
  inputDIV.style = inputDIVstyle;
  container.appendChild(inputDIV);

  var input = document.createElement('input');
  input.setAttribute('id','test-result');
  input.setAttribute('type','text');
  input.setAttribute('class','touchscreenTextInput');
  input. readOnly = true;
  inputDIV.appendChild(input);

  var keypadContainer = document.createElement('div');
  keypadContainer.setAttribute('id','keypad-container');
  container.appendChild(keypadContainer);
  cssText = 'border-style: solid; border-width: 0px 1px 1px 1px;';
  cssText += 'border-radius: 0px 0px 9px 9px;height: 85%;';
  keypadContainer.style = cssText;
  addResultsEntryKeyPad(keypadContainer);

  var finish = document.getElementById('next-button');
  finish.innerHTML = '<span>Finish</span>';
  finish.setAttribute('onmousedown','submitOrderResults();');

  var back = document.getElementById('previous-button');
  back.setAttribute('onmousedown','previousPage(4);')
}

function addResultsEntryKeyPad(e) {
  var keys = [
    ['<','7','8','9'],
    ['=','4','5','6'],
    ['>','1','2','3'],
    ["/",'Del.', '0','.'],
    ['Positivie','Negative','Clear']
  ];

  var keyboard = document.createElement('div');
  cssText = 'margin-left: 30%; display: block; border: solid 1px; width: 355px;';
  cssText += 'text-align: center; height: 415px; top: 120px !important;';
  cssText += 'border-radius: 9px; position: absolute;padding-top: 10px;';

  keyboard.setAttribute('style', cssText);
  e.appendChild(keyboard);

  for(var i = 0 ; i < keys.length ; i++){
    var span = document.createElement('span');
    span.setAttribute('class','buttonLine');
    span.setAttribute('id','buttonLine' + (i + 1));
    keyboard.appendChild(span);
    var keyLine = keys[i];
    
    for(var x = 0 ; x < keyLine.length ; x++){
      var button = document.createElement('button');
      button.setAttribute('onmousedown','keypadPress(this);');
      button.setAttribute('class','keyboardButton');
      button.setAttribute('key', keyLine[x]);
      button.setAttribute('id', (i + 1) + '' + (x + 1));
      button.innerHTML = "<span>" + keyLine[x] + '</span>';
      if(keyLine[x] == 'Clear')
        button.style = 'width: 200px;';

      span.appendChild(button);
    }

  }
}


function keypadPress(key) {
  inputBox = document.getElementById('test-result'); 

  if(inputBox.value.length < 1) {
    var atrr = key.getAttribute('key');
    if(atrr != 'Positivie' && atrr != 'Negative' && atrr != 'Del.'){
      if(atrr != '<' && atrr != '>' && atrr != '='){
        showMessage('Please start by entering one of the following parameters:<br />=, <, >');
        return;
      }
    }
  }

  if(inputBox.value.match(/>|<|=/) && key.getAttribute('key').match(/>|<|=/)){
    var parameter = inputBox.value.match(/>|<|=/)[0];
    showMessage(parameter + ' already selected');
    return;
  }

  
  if(inputBox.value == 'Positivie' || inputBox.value == 'Negative'){
    if(key.getAttribute('key') != 'Clear'){
      return;
    }
  }

  try{                                                                          
                                                                                
    if(key.getAttribute('key').match(/Del/i)){                                            
      inputBox.value = inputBox.value.substring(0, inputBox.value.length - 1);  
    }else if(key.getAttribute('key').match(/Clear/i)){                                    
      inputBox.value = null;
    }else if(key.getAttribute('key') == 'Negative' || key.getAttribute('key') == 'Positivie'){                                    
      inputBox.value = key.getAttribute('key');
    }else{                                                                      
      inputBox.value += key.getAttribute('key');                                          
    }                                                                           
                                                                                
  }catch(x) {
    console.log('######### ' + x)
  }                                                                 
                                                                                
  orderResult = inputBox.value;
}

function submitOrderResults() {

  if(orderResult == 'Positivie' || orderResult == 'Negative') {
    orderResult = '=' + orderResult;
  }

  var currentTime = new Date();
  
  var hour = currentTime.getHours();
  hour = (hour < 10 ? ('0' + hour) : hour);

  var minutes = currentTime.getMinutes();
  minutes = (minutes < 10 ? ('0' + minutes) : minutes);

  var seconds = currentTime.getSeconds();
  seconds = (seconds < 10 ? ('0' + seconds) : seconds);

  var time = ' ' + (hour + ':' + minutes + ':' + seconds);

  order = { 
    accession_number: selectedTestForResultEntry, 
    test_value: (orderResult), time: (testDate + time)
  }
  updateOrder(order);
}

function updateOrder(order) {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/programs/1/lab_tests/results';
  
  
  var parametersPassed = JSON.stringify(order);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
        showMessage('Updated orders');
        cancelOrder();
        getOrders();
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send(parametersPassed);
}

/* .......................... VL reminder ................................. */
var earliest_start_dates;
var vlResults = [];

function dateDiffInDays(date1, date2){
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
}

function dateDiffInMonths(dt2, dt1) {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
}


function getARTstartedDate() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += '/programs/1/patients/' + sessionStorage.patientID;
  url += '/earliest_start_date';

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      earliest_start_dates = JSON.parse(this.responseText);
      calculateVLreminder();
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader('Authorization', sessionStorage.getItem("authorization"));
  xhttp.setRequestHeader('Content-type', "application/json");
  xhttp.send();
}

function calculateVLreminder() {
  if(earliest_start_dates.length < 1){
    return false;
  }

  var earliest_start_date = earliest_start_dates.earliest_start_date
  var period_on_art;

  var date1 = new Date(sessionStorage.sessionDate);
  var date2 = new Date(earliest_start_date);

  period_on_art = dateDiffInMonths(date1, date2);
  
  var resultsVLavailsble = false;
  var vlOrdersDone = false;

  for(var i = 0 ; i < vlResults.length; i++){
    if(vlResults[i].result != null)
      resultsVLavailsble = true;

    vlOrdersDone = true;
  }

/*
          vlResults.push({
            order_date: obj[i].OrderDate,
            accession_number: obj[i].Pat_ID,
            sample_id: obj[i].lab_sample.Sample_ID,
            test_name: obj[i].lab_sample.lab_parameter.test_type.TestName,
            test_type: obj[i].lab_sample.lab_parameter.test_type.TestType,
            result: obj[i].lab_sample.lab_parameter.TESTVALUE,
            range: range,
            result_date: obj[i].lab_sample.DATE
          });*/

  if(resultsVLavailsble) {
    checkIFwithVLBounds();
  }else if(!resultsVLavailsble && vlOrdersDone) {
    askForTheVLresults();
  }else if(period_on_art >= 6){
    vlAlert(period_on_art);
  }

}

function checkIFwithVLBounds() {
  var datesANDresults = {};
  var latest_result_date;

  for(var i = 0 ; i < vlResults.length; i++){
    try {
      var result_date = new Date(vlResults[i].result_date);
      datesANDresults[result_date] = {
        result_date: vlResults.result_date,
        result: vlResults.result,
        range: vlResults.range
      }
      if(latest_result_date == undefined)
        latest_result_date = result_date;

      if(latest_result_date > result_date)
        latest_result_date = result_date;
          
    }catch(e){
      continue;
    }
  }

  var date1 = new Date(sessionStorage.sessionDate);
  var date2 = new Date(latest_result_date);
  var period_gone = dateDiffInMonths(date1, date2);
  
  var earliest_start_date = (earliest_start_dates.earliest_start_date)
  var date1 = new Date(sessionStorage.sessionDate);
  var date2 = new Date(earliest_start_date);
  var period_on_art = dateDiffInMonths(date1, date2);
 
  //if(period_gone < 6);
    //return;
  
  var time_bounds = [];
  var cutoff = 12;
  var i = 0;
  
  while(i <= 36) {
    time_bounds.push({start: (cutoff - 3), end: (cutoff + 3)});
    cutoff += 24  
    i++
  }
  
  if(period_on_art >= time_bounds.start && period_on_art <= time_bounds.end){
    alertVL(latest_result_date, period_gone, period_on_art);
  }
}

function askForTheVLresults() {
  var popUpBox = document.getElementById('orders-popup-div');
  var coverDIV = document.getElementById('orders-cover-div');

  if(coverDIV == undefined) {
    var coverDIV = document.createElement('div')
    coverDIV.setAttribute('id','orders-cover-div');
    var popUpBox = document.createElement('div')
    popUpBox.setAttribute('id','orders-popup-div');
   
    var hmtlBody = document.getElementsByTagName("body")[0];                         
    hmtlBody.appendChild(popUpBox);
    hmtlBody.appendChild(coverDIV);
  }

  coverDIV.style = 'display: inline;';
  popUpBox.style  = 'display: inline;';
  popUpBox.innerHTML = null;

  var message = "Please enter the VL results if available";

  var p = document.createElement('p');
  p.innerHTML = message;
  cssText = 'text-align: center;color: green; font-weight: bold; font-size: 2.3em;';
  cssText += 'margin-top: 10%;';
  p.style = cssText;
  popUpBox.appendChild(p);





  /* ............... buttons ............................... */
  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class','buttonContainer');
  popUpBox.appendChild(buttonContainer);

  var buttonContainerRow = document.createElement('div');
  buttonContainerRow.setAttribute('class','buttonContainerRow');
  buttonContainer.appendChild(buttonContainerRow);

  var cells = ['Cancel','Enter VL results'];

  for(var i = 0 ; i < cells.length ; i++){
    var buttonContainerCell = document.createElement('div');
    buttonContainerCell.setAttribute('class','buttonContainerCell');
    buttonContainerCell.setAttribute('style','width: 100px;');
    buttonContainerCell.innerHTML = cells[i];

    if(i == 0) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-red');
      buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();');
    }else if(i == 1) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-blue');
      buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();enterResults();');
    }

    buttonContainerRow.appendChild(buttonContainerCell);
  }
  
}

function vlAlert(period_on_art){
  var popUpBox = document.getElementById('orders-popup-div');
  var coverDIV = document.getElementById('orders-cover-div');

  if(coverDIV == undefined) {
    var coverDIV = document.createElement('div')
    coverDIV.setAttribute('id','orders-cover-div');
    var popUpBox = document.createElement('div')
    popUpBox.setAttribute('id','orders-popup-div');
   
    var hmtlBody = document.getElementsByTagName("body")[0];                         
    hmtlBody.appendChild(popUpBox);
    hmtlBody.appendChild(coverDIV);
  }

  coverDIV.style = 'display: inline;';
  popUpBox.style  = 'display: inline;';
  popUpBox.innerHTML = null;

  resultsVLavailsble = false;

  for(var i = 0 ; i < vlResults.length; i++){
    if(vlResults[i].result != null)
      resultsVLavailsble = true;

  }


  var message;
  if(!resultsVLavailsble && period_on_art >= 6){
    message = vlFirstMessage(period_on_art);
  }


  var p = document.createElement('p');
  p.innerHTML = message;
  cssText = 'text-align: center;color: green; font-weight: bold; font-size: 2.3em;';
  cssText += 'margin-top: 10%;';
  p.style = cssText;
  popUpBox.appendChild(p);





  /* ............... buttons ............................... */
  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class','buttonContainer');
  popUpBox.appendChild(buttonContainer);

  var buttonContainerRow = document.createElement('div');
  buttonContainerRow.setAttribute('class','buttonContainerRow');
  buttonContainer.appendChild(buttonContainerRow);

  var cells = ['Cancel','Order VL'];

  for(var i = 0 ; i < cells.length ; i++){
    var buttonContainerCell = document.createElement('div');
    buttonContainerCell.setAttribute('class','buttonContainerCell');
    buttonContainerCell.setAttribute('style','width: 100px;');
    buttonContainerCell.innerHTML = cells[i];

    if(i == 0) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-red');
      buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();');
    }else if(i == 1) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-blue');
      buttonContainerCell.setAttribute('onmousedown','orderVLtest();');
    }

    buttonContainerRow.appendChild(buttonContainerCell);
  }
  
}

function cancelVLOrder() {
  var div = document.getElementById('orders-popup-div')
  div.innerHTML = null;
  div.style = 'display: none;';  
  document.getElementById('orders-cover-div').style = 'display: none;';
}

function orderVLtest() {
  cancelVLOrder();
  orderTest();
}

function vlFirstMessage(months){
  var message = "The patient has never been tested for VL before<br />";
  message += "and it has been <b style='color: red;'>" + months + " </b>months since ART treatment<br />"
  message += "was started on the <b style='color: black;'>";
  message += formatDate(new Date(earliest_start_dates.earliest_start_date)) + '</b>';

  return message;
}


function alertVL(latest_result_date,  period_gone, period_on_art) {
  var popUpBox = document.getElementById('orders-popup-div');
  var coverDIV = document.getElementById('orders-cover-div');

  if(coverDIV == undefined) {
    var coverDIV = document.createElement('div')
    coverDIV.setAttribute('id','orders-cover-div');
    var popUpBox = document.createElement('div')
    popUpBox.setAttribute('id','orders-popup-div');
   
    var hmtlBody = document.getElementsByTagName("body")[0];                         
    hmtlBody.appendChild(popUpBox);
    hmtlBody.appendChild(coverDIV);
  }

  coverDIV.style = 'display: inline;';
  popUpBox.style  = 'display: inline;';
  popUpBox.innerHTML = null;

  resultsVLavailsble = false;

  for(var i = 0 ; i < vlResults.length; i++){
    if(vlResults[i].result != null)
      resultsVLavailsble = true;

  }

  var message = "<p>Latest VL recorded was on <span style='color:black;'>";
  message += formatDate(latest_result_date) + "</span>";
  message += "</p> It has been <span style='color: red;'>" + period_gone;
  message += " months</span>";
  message += '<p style="color: black;">Please order a new VL test.</p>';  

  var p = document.createElement('p');
  p.innerHTML = message;
  cssText = 'text-align: center;color: green; font-weight: bold; font-size: 2.3em;';
  cssText += 'margin-top: 10%;';
  p.style = cssText;
  popUpBox.appendChild(p);


  /* ............... buttons ............................... */
  var buttonContainer = document.createElement('div');
  buttonContainer.setAttribute('class','buttonContainer');
  popUpBox.appendChild(buttonContainer);

  var buttonContainerRow = document.createElement('div');
  buttonContainerRow.setAttribute('class','buttonContainerRow');
  buttonContainer.appendChild(buttonContainerRow);

  var cells = ['Cancel','Order VL'];

  for(var i = 0 ; i < cells.length ; i++){
    var buttonContainerCell = document.createElement('div');
    buttonContainerCell.setAttribute('class','buttonContainerCell');
    buttonContainerCell.setAttribute('style','width: 100px;');
    buttonContainerCell.innerHTML = cells[i];

    if(i == 0) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-red');
      buttonContainerCell.setAttribute('onmousedown','cancelVLOrder();');
    }else if(i == 1) {
      buttonContainerCell.setAttribute('id','buttonContainerCell-blue');
      buttonContainerCell.setAttribute('onmousedown','orderVLtest();');
    }

    buttonContainerRow.appendChild(buttonContainerCell);
  }
  
}


/* .......................... VL reminder ends ................................. */
