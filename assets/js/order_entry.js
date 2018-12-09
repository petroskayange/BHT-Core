var panelID;

var resultsTableCSS = document.createElement("span");
resultsTableCSS.innerHTML = "<style>\
#results-table {\
  width: 100%;\
  overflow: auto;\
}\
.results-table-headers {\
  background-color: lightgrey;\
}\
.results-table-headers th {\
  text-align: left;\
  padding-left: 5px;\
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
</style>";

function buildOrderEntry() {
  var frame = document.getElementById('inputFrame' + tstCurrentPage);
  frame.style = 'width: 96%; height: 90%;';

  try {
    var clearBTN = document.getElementById('clearButton');
    clearBTN.style = 'display: none;';
  }catch(z) {}

  
  var coverDIV = document.createElement('div')
  coverDIV.setAttribute('id','orders-cover-div');

  var popUpDIV = document.createElement('div')
  popUpDIV.setAttribute('id','orders-popup-div');



  var nextBtn = document.getElementById('nextButton');
  nextBtn.innerHTML = '<span>Order</span>';
  nextBtn.setAttribute('onmousedown','orderTest();');


  var resultsTable = document.createElement('table');
  resultsTable.setAttribute('id','results-table');
  frame.appendChild(resultsTable);

  var thead = document.createElement('tbody');
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

  getOrders();
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
  nextB.setAttribute('onmousedown','nextPage(0);');
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
  nextB.setAttribute('onmousedown','nextPage(0);');
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

  loadLabOrders();
}

function keyboardPress(key) {
  var inputBox = document.getElementById('input-lab-order'); 

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
                                                                                
  loadLabOrders();
}






function cancelOrder() {
  var box = document.getElementById('orders-popup-div')
  box.innerHTML = null;
  box.style = 'display: none;';
  document.getElementById('orders-cover-div').style = 'display: none;';
}

function getOrders() {
  var url = apiProtocol + "://" + apiURL + ":" + apiPort + "/api/v1";
  url += "/programs/1/lab_tests/orders?patient_id=" + sessionStorage.patientID;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 201 || this.status == 200)) {
      var obj = JSON.parse(this.responseText);
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

function nextPage(num) {
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
  }
}

function previousPage(num) {
  var container = document.getElementById('input-container');
  var root = document.getElementById('orders-nav-bar');
  container.innerHTML = null;
  var backBTN = document.getElementById('previous-button');
  root.removeChild(backBTN)
  
  if(num == 0){
    addOrders();
  }else if(num == 1){
    buildLabTestTypes();
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
  nextB.setAttribute('onmousedown','nextPage(1);');

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
  }else{
    img.setAttribute('src','/public/touchscreentoolkit/lib/images/ticked.jpg');
    e.style = 'background-color: lightblue;';
  }
}

function buildTestDate() {
  var container = document.getElementById('input-container');
  
  var helpText = document.createElement('label');
  helpText.innerHTML = 'Test date';
  helpText.setAttribute('class','helpTextClass');
  container.appendChild(helpText);

  addDate(container);
}

function addDate(e) {

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

  var prevBTN = document.getElementById('previous-button');
  prevBTN.setAttribute('onmousedown','previousPage(1);');
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
